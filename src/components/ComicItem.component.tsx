import React, { PropsWithChildren } from 'react';
import { ComicRankItem } from '../services/comic';
import shortId from 'shortid';

export interface ComicItemProps {
  comic: ComicRankItem;
  // ref: any;
}
const ComicItem = (props: PropsWithChildren<ComicItemProps>) => {
  const { comic } = props;
  return (
    <li className="lzComic__item">
      <div className="lzComic__thumb">
        <img src={comic.thumbnailSrc} />
      </div>
      <div className="lzComic__count">
        <strong className="lzComic__rank">{comic.currentRank}</strong>
        <span className="lzComic__status">
          {comic.currentRank > comic.previousRank
            ? '랭킹상승'
            : comic.currentRank === comic.previousRank
            ? '변동 없음'
            : '하락'}
        </span>
      </div>
      <div className="lzComic__info">
        <p className="lzComic__title">{comic.title}</p>
        {comic.artists.map(artist => {
          if (
            artist.role === 'writer' ||
            artist.role === 'painter' ||
            artist.role === 'scripter'
          ) {
            return (
              <p key={shortId.generate()} className="lzComic__meta">
                <span className="lzComic__artist">
                  {artist.role} {artist.name}
                </span>
              </p>
            );
          }
        })}
        <p className="lzComic__free">{comic.freedEpisodeSize}화 무료</p>
        <p className="lzComic__state">
          {comic.contentsState === 'scheduled'
            ? `매주 ${comic.schedule.periods[0]}요일 연재`
            : '완결'}
        </p>
      </div>
    </li>
  );
};

export default ComicItem;
