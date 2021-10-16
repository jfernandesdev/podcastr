import React from 'react';

import styles from './styles.module.scss';

export default ToggleThemes;

export function ToggleThemes({theme, setTheme}) {
  function handleToggleTheme ()  {
    switch (theme) {
      case 'light':
        setTheme('dark');
      break;
      case 'dark':
        setTheme('light');
      break;
      default: 
        setTheme('light'); 
      break;
    }
  }

  return (
    <div className={styles.containerSwitch}>
      <input 
        type="checkbox" 
        id="toggleTheme" 
        checked={theme === 'dark' && true}
        className={styles.switch} 
        onClick={handleToggleTheme} 
      />
      <label htmlFor="toggleTheme"></label>
    </div>
  );
}




