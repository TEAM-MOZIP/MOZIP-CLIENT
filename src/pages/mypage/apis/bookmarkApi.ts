import axiosInstance from '@shared/apis/axiosInstance';
import { ENDPOINTS } from '@shared/apis/endpoints';
import type { GetMyBookmarksData } from '@shared/apis/generated/Api';

export type GetMyBookmarksParams = {
  page?: number;
  size?: number;
  sort?: string;
};

export const getMyBookmarks = async (
  params: GetMyBookmarksParams = {}
): Promise<GetMyBookmarksData> => {
  const { data } = await axiosInstance.get<GetMyBookmarksData>(
    ENDPOINTS.BOOKMARKS.LIST,
    {
      params: {
        page: params.page ?? 0,
        size: params.size ?? 20,
        sort: params.sort ?? 'createdAt,desc',
      },
    }
  );
  return data;
};

export const removeBookmark = async (
  policyId: string | number
): Promise<void> => {
  await axiosInstance.delete(ENDPOINTS.BOOKMARKS.DELETE(policyId));
};
