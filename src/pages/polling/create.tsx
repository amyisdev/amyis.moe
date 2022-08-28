import { CardContainer, CardSection } from '@/components/Card'
import { SmolContainer } from '@/components/layouts/Default'
import { trpc } from '@/utils/trpc'
import { createPollInput } from '@/validators/polls'
import { zodResolver } from '@hookform/resolvers/zod'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { HTMLProps } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiTrash, HiXCircle } from 'react-icons/hi'
import { twMerge as clsx } from 'tailwind-merge'
import { z } from 'zod'

type InputContainerProps = HTMLProps<HTMLDivElement> & {
  htmlFor?: string
  label?: string
  error?: string
  containerClassName?: string
}

const InputContainer = (props: InputContainerProps) => {
  return (
    <div className={props.containerClassName}>
      {props.label && (
        <label htmlFor={props.htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-400">
          {props.label}
        </label>
      )}

      <div className={clsx(props.label && 'mt-1', props.className)}>{props.children}</div>
      {props.error && <p className="mt-1 text-sm text-red-600">{props.error}</p>}
    </div>
  )
}

const CreatePoll: NextPage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createPollInput>>({
    resolver: zodResolver(createPollInput),
    defaultValues: {
      question: 'Which one is the best pokemon?',
      isPublic: true,
      options: [{ content: 'Pikachu' }, { content: 'Charizard' }],
    },
  })

  const { fields, remove, append } = useFieldArray({ control, name: 'options' })

  const mutation = trpc.useMutation(['polls.create-poll'])
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { poll } = await mutation.mutateAsync(data)
      router.push(`/polling/${poll.urlId}`)
    } catch (err) {
      //
    }
  })

  return (
    <SmolContainer>
      <CardContainer>
        <CardSection>
          <h1 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Create Poll</h1>
        </CardSection>

        <CardSection>
          {mutation.error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <HiXCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <h3 className="ml-3 text-sm font-medium text-red-800">{mutation.error.message}</h3>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit}>
            <InputContainer label="Question" htmlFor="question" error={errors.question?.message}>
              <textarea
                id="question"
                className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 sm:text-sm"
                {...register('question')}
              />
            </InputContainer>

            <div className="mt-4 space-y-2">
              <p className="flex text-sm font-medium text-gray-700 dark:text-gray-400">
                Options
                {errors.options && <span className="ml-4 text-sm text-red-600">{errors.options?.message}</span>}
              </p>

              {fields.map((field, index) => (
                <InputContainer
                  key={field.id}
                  error={errors.options && errors.options[index]?.content?.message}
                  className="flex rounded-md "
                >
                  <label htmlFor={`options.${index}.content`} className="sr-only">
                    Option {index + 1}
                  </label>
                  <input
                    type="text"
                    className="block w-full flex-grow rounded-none rounded-l-md border-gray-300 focus:z-10 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 sm:text-sm"
                    {...register(`options.${index}.content`)}
                  />
                  <button
                    type="button"
                    className="-ml-px rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-500 hover:brightness-105 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-500 dark:text-white"
                    onClick={() => remove(index)}
                  >
                    <HiTrash />
                  </button>
                </InputContainer>
              ))}

              <button
                type="button"
                className="rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm hover:brightness-105 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-500 dark:text-white"
                onClick={() => append({ content: '' })}
              >
                Add Option
              </button>
            </div>

            <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-400">Settings</p>

            <div className="mt-2 flex items-center">
              <input
                id="public_poll"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-500 dark:checked:border-primary-500 dark:checked:bg-primary-500"
                {...register('isPublic')}
              />

              <label htmlFor="public_poll" className="ml-3 text-sm text-gray-700 dark:text-gray-400">
                Allow anyone without link to find the poll
              </label>
            </div>

            <button
              type="submit"
              disabled={mutation.isLoading || mutation.isError}
              className="mt-4 rounded-md bg-primary-500 px-4 py-2 text-sm text-white hover:brightness-105 disabled:opacity-70 disabled:hover:brightness-100 dark:bg-primary-600"
            >
              {mutation.isLoading ? 'Creating...' : 'Create'}
            </button>
          </form>
        </CardSection>
      </CardContainer>
    </SmolContainer>
  )
}

export default CreatePoll
