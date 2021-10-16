import GlobalStyles from '../styles/globals';
import { ThemeProvider } from 'next-themes';

import { Header } from '../components/Header'
import { Player } from '../components/Player'

import { PlayerContextProvider } from '../contexts/PlayerContexts';

import styles from '../styles/app.module.scss'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="light" enableSystem={false} >
      <PlayerContextProvider>
        <GlobalStyles />
        <div className={styles.wrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </div>
      </PlayerContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
