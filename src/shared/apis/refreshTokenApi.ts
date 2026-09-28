import axios from 'axios';
import { ENDPOINTS } from '@shared/apis/endpoints';
import type {
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@shared/types/auth';

export const postRefreshToken = async (payload: RefreshTokenRequest) => {
  const { data } = await axios.post<RefreshTokenResponse>(
    `${import.meta.env.VITE_API_BASE_URL}${ENDPOINTS.AUTH.REFRESH}`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};
