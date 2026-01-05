import { api, safeRequest } from "@/config/axios.config";
import API_ROUTES from "../../shared/src/api";
import { CreateRating, UserRating } from "../../shared/src/types";
import { publicApi } from "@/config/publicApi.config";

export class RatingService {
  static async getRating(userId: number, offset: number, isPrivate: boolean = true): Promise<any> {
    return safeRequest(async () => {
      const res = isPrivate 
        ? await api.get(API_ROUTES.rating.getRating(userId, offset))
        : await publicApi.get(API_ROUTES.rating.getRating(userId, offset));
      return res.data;
    });
  }

  static async getOneRating(raterId: number, targetId: number): Promise<any> {
    return safeRequest(async () => {
      const res = await api.get(
        API_ROUTES.rating.getOneRating(raterId, targetId)
      );
      return res.data;
    });
  }

  static async getTotalRating(userId: number, isPrivate: boolean = true): Promise<any> {
    return safeRequest(async () => {
      const res = isPrivate 
        ? await api.get(API_ROUTES.rating.getTotalRating(userId))
        : await publicApi.get(API_ROUTES.rating.getTotalRating(userId));
      return res.data;
    });
  }

  static async createRating(data: CreateRating): Promise<any> {
    return safeRequest(async () => {
      const res = await api.post(API_ROUTES.rating.createRating, data);
      return res.data;
    });
  }

  static async updateRating(data: CreateRating): Promise<any> {
    return safeRequest(async () => {
      const res = await api.patch(API_ROUTES.rating.updateRating, data);
      return res.data;
    });
  }
}
