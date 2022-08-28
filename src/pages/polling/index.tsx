import { CardContainer, CardSection } from '@/components/Card'
import { SmolContainer } from '@/components/layouts/Default'
import { trpc } from '@/utils/trpc'
import { Poll } from '@prisma/client'
import { NextPage } from 'next'
import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { HiPlus } from 'react-icons/hi'

const PollList = ({ polls }: { polls: Poll[] }) => {
  return (
    <ul className="ml-4 mt-4 list-disc">
      {polls?.map((poll) => (
        <li key={poll.id}>
          <Link href={`polling/${poll.id}`}>
            <a className="hover:underline">{poll.question}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const MyPolls = () => {
  const { status } = useSession()
  const { data: myPolls, isLoading, error } = trpc.useQuery(['polls.my-polls'], { staleTime: 30 * 1000 })

  if (status === 'loading' || isLoading) {
    return <p className="text-gray-700 dark:text-gray-400">Loading....</p>
  }

  if (status === 'unauthenticated' || error?.data?.code === 'UNAUTHORIZED') {
    return (
      <button
        className="w-full rounded-md bg-primary-500 px-4 py-2 text-white hover:brightness-110 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-600"
        onClick={() => signIn('discord')}
      >
        Click here to sign in
      </button>
    )
  }

  return (
    <div>
      <Link href="/polling/create">
        <a className="inline-flex items-center rounded-md bg-primary-500 px-4 py-2 text-white hover:brightness-110 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-600">
          <HiPlus className="mr-1 h-5 w-5" />
          Create poll
        </a>
      </Link>

      {myPolls?.length === 0 && <p>You dont have any polls</p>}
      {!!myPolls?.length && <PollList polls={myPolls} />}
    </div>
  )
}

const PublicPolls = () => {
  const { data, isLoading } = trpc.useQuery(['polls.public-polls'], { staleTime: 30 * 1000 })

  if (isLoading) {
    return <p className="text-gray-700 dark:text-gray-400">Loading....</p>
  }

  return (
    <>
      {data?.length === 0 && <p>There are no public polls</p>}
      {!!data?.length && <PollList polls={data} />}
    </>
  )
}

const Polling: NextPage = () => {
  return (
    <SmolContainer>
      <CardContainer>
        <CardSection>
          <h1 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Your Polls</h1>
        </CardSection>

        <CardSection>
          <MyPolls />
        </CardSection>
      </CardContainer>

      <CardContainer>
        <CardSection>
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Public Polls</h3>
        </CardSection>
        <CardSection>
          <PublicPolls />
        </CardSection>
      </CardContainer>
    </SmolContainer>
  )
}

export default Polling
