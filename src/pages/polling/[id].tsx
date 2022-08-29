import { CardContainer, CardSection } from '@/components/Card'
import { SmolContainer } from '@/components/layouts/Default'
import { trpc } from '@/utils/trpc'
import { votePollInput } from '@/validators/polls'
import { zodResolver } from '@hookform/resolvers/zod'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiXCircle } from 'react-icons/hi'
import { z } from 'zod'

const Poll: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string

  const [viewResult, setViewResult] = useState(false)

  const { data, error, isLoading, refetch } = trpc.useQuery(['polls.get-poll', { id }], {
    retry: false,
    enabled: !!id,
  })

  const mutation = trpc.useMutation(['polls.vote-poll'])

  const { register, handleSubmit } = useForm<z.infer<typeof votePollInput>>({
    resolver: zodResolver(votePollInput),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutation.mutateAsync(data)
      refetch()
      setViewResult(true)
    } catch (err) {
      //
    }
  })

  if (error) {
    return (
      <SmolContainer>
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-4 text-red-800 dark:border-transparent dark:bg-red-600 dark:text-white">
          <div className="flex">
            <div className="flex-shrink-0">
              <HiXCircle className="h-5 w-5 text-red-400 dark:text-white" aria-hidden="true" />
            </div>

            <h3 className="ml-3 text-sm font-medium">{error.message}</h3>
          </div>
        </div>
      </SmolContainer>
    )
  }

  if (isLoading || !data) {
    return (
      <SmolContainer>
        <CardContainer>
          <CardSection>
            <p className="text-gray-700 dark:text-gray-400">Loading....</p>
          </CardSection>
        </CardContainer>
      </SmolContainer>
    )
  }

  return (
    <SmolContainer className="space-y-4">
      {mutation.error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-4 text-red-800 dark:border-transparent dark:bg-red-600 dark:text-white">
          <div className="flex">
            <div className="flex-shrink-0">
              <HiXCircle className="h-5 w-5 text-red-400 dark:text-white" aria-hidden="true" />
            </div>

            <h3 className="ml-3 text-sm font-medium">{mutation.error.message}</h3>
          </div>
        </div>
      )}

      {data.isOwner && (
        <CardContainer>
          <CardSection>
            <p className="font-medium text-gray-900 dark:text-gray-100">Control Panel</p>
          </CardSection>
        </CardContainer>
      )}

      {!viewResult && (
        <CardContainer>
          <CardSection>
            <form onSubmit={onSubmit}>
              <h1 className="font-medium text-gray-900 dark:text-gray-100">{data.poll.question}</h1>
              <fieldset className="mt-4">
                <legend className="sr-only">{data.poll.question}</legend>
                <div className="space-y-4">
                  {data.poll.options.map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        id={option.id.toString()}
                        type="radio"
                        value={option.id}
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-600 dark:checked:border-primary-500 dark:checked:bg-primary-500"
                        {...register('optionId')}
                      />

                      <label
                        htmlFor={option.id.toString()}
                        className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        {option.content}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="mt-4 flex items-center space-x-2">
                <button
                  type="submit"
                  disabled={mutation.isLoading || mutation.isError}
                  className="rounded-md bg-primary-500 px-4 py-2 text-sm text-white hover:brightness-105 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-70 disabled:hover:brightness-100 dark:bg-primary-600"
                >
                  {mutation.isLoading ? 'Submitting...' : 'Submit'}
                </button>

                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm  hover:brightness-105 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-500 dark:text-white"
                  onClick={() => setViewResult(true)}
                >
                  View results
                </button>
              </div>
            </form>
          </CardSection>
        </CardContainer>
      )}

      {viewResult && (
        <CardContainer>
          <CardSection>
            <h1 className="font-medium text-gray-900 dark:text-gray-100">{data.poll.question}</h1>
            <fieldset disabled className="mt-4">
              <legend className="sr-only">{data.poll.question}</legend>
              <div className="space-y-4">
                {data.poll.options.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      disabled
                      id={option.id.toString()}
                      type="radio"
                      value={option.id}
                      defaultChecked={option.id === data.userVote?.optionId}
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-600 dark:checked:border-primary-500 dark:checked:bg-primary-500"
                    />

                    <label
                      htmlFor={option.id.toString()}
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      {option.content}
                      <span aria-hidden>{` (${option._count.votes} votes)`}</span>
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            {!data.userVote && (
              <div className="mt-4 flex items-center space-x-2">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm  hover:brightness-105 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-500 dark:text-white"
                  onClick={() => setViewResult(false)}
                >
                  Back to vote
                </button>
              </div>
            )}
          </CardSection>
        </CardContainer>
      )}
    </SmolContainer>
  )
}

export default Poll
