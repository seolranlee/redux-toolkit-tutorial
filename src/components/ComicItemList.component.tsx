import React, { PropsWithChildren } from 'react';
import { ComicRankItem } from '../services/comic';
import ComicItem from './ComicItem.component';

export interface ComicItemListProps {
  comics: ComicRankItem[];
}

const ComicItemList = (props: PropsWithChildren<ComicItemListProps>) => {
  const { comics } = props;

  return (
    <ul className="lzComic__list">
      <>
        {comics.map(comic => (
          <ComicItem key={comic.id} comic={comic} />
        ))}
      </>
    </ul>
  );
};

export default ComicItemList;
