// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import QueryClientConfig from 'src/api/query-client-config'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { AuthProvider } from 'src/@core/context/authContext'
import { SnackbarProvider } from 'src/@core/context/snackbarContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  // Role
  const role = Component.getRole ? Component.getRole() : null

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Yalla cafe | yalla-cafe.uz</title>
        <meta name='description' content={'Mazali taomlar'} />
        <meta name='keywords' content='burger, chizburgerlar, hot dog, fast food, mazali taomlar' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <QueryClientConfig>
        <AuthProvider role={role}>
          <SnackbarProvider>
            <SettingsProvider>
              <SettingsConsumer>
                {({ settings }) => {
                  return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </SnackbarProvider>
        </AuthProvider>
      </QueryClientConfig>
    </CacheProvider>
  )
}

export default App
