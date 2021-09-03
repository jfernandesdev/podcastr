import { GetStaticPaths, GetStaticProps } from 'next';

import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import { api } from '../../services/api';
import { usePlayer } from '../../contexts/PlayerContexts'

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import styles from './episode.module.scss';

type Episodes = {
  id: string,
  title: string,
  thumbnail: string,
  members: string,
  duration: number,
  durationAsString: string,
  url: string,
  publishedAt: string,
  description: string
};

type EpisodesProps = {
  episode: Episodes
}

export default function Episodes({ episode }: EpisodesProps) {
  const { play } = usePlayer();

  return (
    <div className={styles.scrollPage}>
      <div className={styles.episode}>
        <Head>
          <title>{episode.title} | Podcastr</title>
        </Head>

        <div className={styles.thumbnailContainer}>
          <Link href='/'>
            <button type="button">
              <img src="/arrow-left.svg" alt="Voltar" />
            </button>
          </Link>

          <Image
            width={700}
            height={160}
            src={episode.thumbnail}
            alt={episode.title}
            objectFit="cover"
          />

          <button type="button" onClick={() => play(episode)}>
            <img src="/play.svg" alt="Tocar episódio" />
          </button>
        </div>

        <header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </header>

        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const paths = data.map(episode => {
    return {
      params: {
        id: episode.id
      }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params;
  const { data } = await api.get('episodes', {
    params: {
      w: 'id',
      wr: `${id}`
    }
  })

  const episode = {
        id: data.id,
        title: data.title,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        thumbnail: data.thumbnail,
        description: data.description,
        url: data.url,
        type: data.type,
        duration: data.duration,
        durationAsString: convertDurationToTimeString(Number(data.duration)),
    }

    return {
        props: { episode },
        revalidate: 60 * 60 * 24 // - 24h
    }
}
