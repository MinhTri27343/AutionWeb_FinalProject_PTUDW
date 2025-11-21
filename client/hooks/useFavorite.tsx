import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FavoriteService } from "@/services/favoriteService";
import { STALE_10_MIN } from "@/config/query.config";

// Một hàm xử lý logic REACT, và chỉ được biết tới REACT(FRONT END) thôi
// Nó không được biết về api
class FavoriteHook {
  static useFavorite() {
    return useQuery({
      queryKey: ["Favorite"],

      queryFn: () => FavoriteService.getFavorite(),

      staleTime: STALE_10_MIN,

      select: (data) => {
        return data;
      }
    });
  }

  static useUpdateFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (params: { productId: number; isFavorite: boolean }) =>
        FavoriteService.updateFavorite(params.productId, params.isFavorite),

      onSuccess: (_, params) => {
        // Invalidate cache của dữ liệu
        queryClient.invalidateQueries({
          queryKey: ["Favorite"],
        });
      }
    });
  }
}

export default FavoriteHook;
