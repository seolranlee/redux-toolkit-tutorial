import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ComicRankItem } from '../services/comic';
import ComicItem from './ComicItem.component';

export interface ComicItemListProps {
  comics: ComicRankItem;
}

const ComicItemList = (props: PropsWithChildren<ComicItemListProps>) => {
  return (
    <>
      <ComicItem />
    </>
  );
};

export default ComicItemList;
