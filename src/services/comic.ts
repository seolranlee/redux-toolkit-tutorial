import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 연재 요일
type Period = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

// 작가 롤
type ArtistRole =
  | 'writer'
  | 'painter'
  | 'scripter'
  | 'original'
  | 'publisher'
  | 'label';

interface Artist {
  name: string;
  role: ArtistRole;
  id: string;
}

export interface ComicRankItem {
  id: number;
  alias: string;
  title: string;
  artists: Artist[];
  schedule: {
    periods: Period[];
  };
  genres: string[];
  freedEpisodeSize: number;
  contentsState: 'scheduled' | 'completed';
  currentRank: number;
  previousRank: number;
  updatedAt: number;
  print: boolean;
  thumbnailSrc: string;
}

export interface ComicRankApiSuccessResponse {
  count: number;
  hasNext: boolean;
  data: ComicRankItem[];
}

export interface ComicRankApiFailResponse {
  error: string;
}

// Define a service using a base URL and expected endpoints
export const comicApi = createApi({
  reducerPath: 'comicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'api/',
  }),
  endpoints: builder => ({
    getComicByPage: builder.query<ComicRankApiSuccessResponse, number>({
      query: page => `comics/romance/page_${page}.json`,
    }),
  }),
});

export const { useGetComicByPageQuery } = comicApi;
