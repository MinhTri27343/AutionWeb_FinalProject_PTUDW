import { api, safeRequest } from "../config/axios.config"

export class FavoriteService {
  static async getFavorite(): Promise<any> {
    return safeRequest(async () => {
      const res = await api.get("/favorite");
      return res.data;
    });
  }

  static async updateFavorite(productId: number, isFavorite: boolean): Promise<any> {
    return safeRequest(async () => {
      const res = await api.patch(`/favorite/${productId}/${isFavorite}`);
      return res.data;
    });
  }
}

