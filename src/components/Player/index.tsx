import styles from './styles.module.scss'

export function Player() {
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora!</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={styles.empty}>

        <div className={styles.progress}>
          <span>00:00:00</span>

          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>

          <span>00:00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button" disabled>
            <img src="/shuffle.svg" alt="Aleatório" />
          </button>

          <button type="button" disabled>
            <img src="/play-previous.svg" alt="Anterior" />
          </button>

          <button type="button" className={styles.playButton} disabled>
            <img src="/play.svg" alt="Reproduzir" />
          </button>

          <button type="button" disabled>
            <img src="/play-next.svg" alt="Próximo" />
          </button>

          <button type="button" disabled>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}