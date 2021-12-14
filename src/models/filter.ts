import { ComicRankItem } from '../services/comic';

export const filters = [
  {
    label: '연재 중',
    id: 'scheduled',
    key: 'contentsState',
    isChecked: false,
    condition: (comic: ComicRankItem) => comic.contentsState === 'scheduled',
  },
  {
    label: '완결',
    id: 'completed',
    key: 'contentsState',
    isChecked: false,
    condition: (comic: ComicRankItem) => comic.contentsState === 'completed',
  },
  {
    label: '무료회차 3개 이상',
    id: 'free',
    key: 'freedEpisodeSize',
    isChecked: true,
    condition: (comic: ComicRankItem) => comic.freedEpisodeSize >= 10,
  },
];
