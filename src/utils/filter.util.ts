import { Filter } from '../features/comic/comicSlice';
import { ComicRankItem } from '../services/comic';
// import { setFilter } from '../features/comic/comicSlice';

export const filteredComics = (filters: Filter[], comics: ComicRankItem[]) => {
  const isFree = filters
    .filter(filter => filter.isSelected)
    .map(filter => filter.key)
    .includes('freedEpisodeSize');

  const isCompleted = filters
    .filter(filter => filter.isSelected)
    .map(filter => filter.key)
    .includes('completed');

  const isScheduled = filters
    .filter(filter => filter.isSelected)
    .map(filter => filter.key)
    .includes('scheduled');

  if (isFree) {
    if (isCompleted) {
      return comics.filter(
        (comic: ComicRankItem) =>
          comic.freedEpisodeSize >= 3 && comic.contentsState === 'completed'
      );
    }
    if (isScheduled) {
      return comics.filter(
        (comic: ComicRankItem) =>
          comic.freedEpisodeSize >= 3 && comic.contentsState === 'scheduled'
      );
    }
    return comics.filter((comic: ComicRankItem) => comic.freedEpisodeSize >= 3);
  }
  if (isCompleted) {
    return comics.filter(
      (comic: ComicRankItem) => comic.contentsState === 'completed'
    );
  }
  if (isScheduled) {
    return comics.filter(
      (comic: ComicRankItem) => comic.contentsState === 'scheduled'
    );
  }

  return comics;
};
