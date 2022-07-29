import { CardContainer, CardSection } from '@/components/Card'
import { SmolContainer } from '@/components/Layout'
import { trpc } from '@/utils/trpc'
import clsx from 'clsx'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SiSpotify } from 'react-icons/si'

type ArtistListProps = {
  artists: Array<{ name: string; external_urls: string }>
  prefix?: string
}

const ArtistList = ({ artists, prefix }: ArtistListProps) => {
  const length = artists.length

  return (
    <p className="text-gray-700 dark:text-gray-400">
      {prefix && `${prefix} `}
      {artists.map((artist, i) => (
        <span key={i}>
          <a href={artist.external_urls} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {artist.name}
          </a>

          {length > 1 && i !== length - 1 && i === length - 2 && ' & '}
          {length > 1 && i !== length - 1 && i !== length - 2 && ', '}
        </span>
      ))}
    </p>
  )
}

const NowPlaying = () => {
  const { data, isLoading } = trpc.useQuery(['spotify.nowPlaying'], {
    staleTime: 30 * 1000,
  })

  if (isLoading) {
    return (
      <>
        <h2 className="text-sm font-medium text-gray-700 dark:text-gray-400">Currently playing</h2>
        <p className="text-gray-700 dark:text-gray-400">Loading....</p>
      </>
    )
  }

  if (!data || !data.isPlaying) {
    return <h2 className="text-sm font-medium text-gray-700 dark:text-gray-400">Currently not playing spotify</h2>
  }

  return (
    <div>
      <h2 className="text-sm font-medium text-gray-700 dark:text-gray-400">Currently playing</h2>

      <div className="mt-2 flex flex-col sm:flex-row sm:items-start">
        {data.smallImage && (
          <div className="hidden sm:block">
            <Image height={96} width={96} alt={`${data.name} album art`} src={data.smallImage} className="rounded-md" />
          </div>
        )}

        {data.bigImage && (
          <div className="relative mx-auto h-auto w-full max-w-[280px] sm:hidden">
            <Image layout="fill" alt={`${data.name} album art`} src={data.bigImage} className="rounded-xl" />
          </div>
        )}

        <div className="ml-0 mt-2 space-y-0.5 sm:ml-4 sm:mt-0">
          <p className="line-clamp-1 text-xl font-medium leading-7 text-gray-900 dark:text-gray-100">
            <a href={data.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {data.name}
            </a>
          </p>

          <ArtistList artists={data.artists} prefix="by" />

          <p className="text-gray-700 dark:text-gray-400">
            from{' '}
            <a href={data.fromUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {data.from === 'artist' ? 'the artist page' : `a ${data.from}`}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

const Spotify: NextPage = () => {
  const { data } = trpc.useQuery(['spotify.topTracks'], {
    staleTime: 12 * 60 * 60 * 1000,
  })

  return (
    <>
      <Head>
        <title>My Spotify</title>
      </Head>

      <SmolContainer className="space-y-8">
        <CardContainer>
          <CardSection>
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">My Spotify</h1>
              <SiSpotify className="h-8 w-8 text-[#1DB954]" />
            </div>
          </CardSection>

          <CardSection>
            <NowPlaying />
          </CardSection>
        </CardContainer>

        <CardContainer>
          <CardSection>
            <h2 className="font-medium text-gray-900 dark:text-gray-100">Top Tracks</h2>
          </CardSection>

          {data && (
            <CardSection className="space-y-2 divide-y divide-gray-200 dark:divide-gray-700 dark:divide-opacity-70">
              {data.items.map((track, i) => (
                <div key={i} className={clsx(['flex', i === 0 ? '' : 'pt-4'])}>
                  <p className="mt-0.5 text-sm font-bold text-gray-500">{i + 1}</p>

                  <div className="flex flex-col pl-3">
                    <a
                      href={track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-gray-900 hover:underline dark:text-gray-100"
                    >
                      {track.name}
                    </a>

                    <ArtistList artists={track.artists} />
                  </div>
                </div>
              ))}
            </CardSection>
          )}
        </CardContainer>
      </SmolContainer>
    </>
  )
}

export default Spotify
