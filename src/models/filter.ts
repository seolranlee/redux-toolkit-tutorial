import { ComicRankItem } from '../services/comic';

export const filters = [
  {
    label: '연재 중',
    key: 'contentsState',
    checked: false,
    condition: (comic: ComicRankItem) => comic.contentsState === 'scheduled',
  },
  {
    label: '완결',
    key: 'contentsState',
    checked: false,
    condition: (comic: ComicRankItem) => comic.contentsState === 'completed',
  },
  {
    label: '무료회차 3개 이상',
    key: 'freedEpisodeSize',
    checked: false,
    condition: (comic: ComicRankItem) => comic.freedEpisodeSize >= 10,
  },
];
