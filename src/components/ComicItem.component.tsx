import React, { PropsWithChildren } from 'react';
import { ComicRankItem } from '../services/comic';

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
      <div className="lzComic__count"></div>
      <div className="lzComic__info">
        <p className="lzComic__title">{comic.title}</p>
        {comic.artists.map(artist => {
          if (
            artist.role === 'writer' ||
            artist.role === 'painter' ||
            artist.role === 'scripter'
          ) {
            return (
              <p className="lzComic__meta">
                <span className="lzComic__artist">
                  {artist.role} {artist.name}
                </span>
              </p>
            );
          }
        })}
        <p className="lzComic__free">{comic.freedEpisodeSize}화 무료</p>
      </div>
    </li>
  );
};

export default ComicItem;
