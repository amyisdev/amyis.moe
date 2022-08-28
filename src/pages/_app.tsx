// src/pages/_app.tsx
import '../styles/globals.css'
import { Layout } from '@/components/layouts/Default'
import type { AppRouter } from '@/server/router'
import { httpLink } from '@trpc/client/links/httpLink'
import { withTRPC } from '@trpc/next'
import type { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import superjson from 'superjson'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">{getLayout(<Component {...pageProps} />)}</ThemeProvider>
    </SessionProvider>
  )
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`

    return {
      url,
      transformer: superjson,
      links: [
        httpLink({
          url: '/api/trpc',
        }),
      ],

      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: { defaultOptions: { queries: { retry: false } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp)
