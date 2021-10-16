import { useTheme } from 'next-themes';
import {useState, useEffect} from 'react';
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import Link from 'next/link'

import {ToggleThemes} from '../ToggleThemes';

import styles from './styles.module.scss'

export function Header() {
  const { theme, setTheme } = useTheme();

  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  });

  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <header className={styles.headerContainer}>
     <div>
        <Link href="/">
          <img src={ theme == 'dark' ? '/logo-dark.svg' : '/logo.svg'} alt="Logo Podcastr" />
        </Link>
        <p>O melhor para você ouvir sempre!</p>
      </div>

      <div>
       <ToggleThemes theme={theme} setTheme={setTheme}/>
        <span>{currentDate}</span>
      </div>
    </header>
  );
}
