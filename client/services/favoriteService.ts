import { api, safeRequest } from "../config/axios.config"

export class FavoriteService {
  static async getFavorite(): Promise<any> {
    return safeRequest(async () => {
      const res = await api.get("/favorite");
      return res.data;
    });
  }

  static async createFavorite(payload: any) {
    return safeRequest(async () => {
      const res = await api.post('/favorite', payload);
      return res.data;
    });
  }

  static async updateFavorite(productId: number, isFavorite: boolean): Promise<any> {
    return safeRequest(async () => {
      const res = await api.put(`/favorite/${productId}/${isFavorite}`);
      return res.data;
    });
  }
}

