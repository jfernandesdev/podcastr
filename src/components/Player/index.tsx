import { useRef, useEffect, useState } from 'react'

import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { usePlayer } from '../../contexts/PlayerContexts'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

import styles from './styles.module.scss'

export function Player() {
  const {
    episodeList,
    currentEpisodeIndex,
  } = usePlayer();

  const episode = episodeList[currentEpisodeIndex]

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora!</strong>
      </header>

      {
        episode ? (
          <div className={styles.currentEpisode}>
            <Image
              width={592}
              height={592}
              src={episode.thumbnail}
              alt={episode.title}
              objectFit="cover"
            />
            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </div>
        ) : (
          <div className={styles.emptyPlayer}>
            <strong>Selecione um podcast para ouvir</strong>
          </div>
        )
      }

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