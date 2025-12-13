import { create } from "zustand";
import { RegisterRequest, SignRequest } from "../../shared/src/types";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  setAccessToken: (accessToken: string) => {
    set({accessToken});
  },
  clearState: () => {
    set({ accessToken: null, user: null, loading: false });
  },

  signUp: async (user: RegisterRequest) => {
    try {
      set({ loading: true });
      // goi api

      await authService.signUp(user);
      toast.success("Đăng kí thành công");
    } catch (error) {
      console.log(error);
      toast.error("Đăng kí không thành công");
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (user: SignRequest) => {
    try {
      set({ loading: true });

      const { accessToken } = await authService.signIn(user);
      get().setAccessToken(accessToken);
      await get().fetchMe();
      toast.success("Chào mừng bạn quay lại với trang của chúng tôi");
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập không thành công");
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      get().clearState();
      await authService.signOut();
      toast.success("Đăng xuất thành công");
    } catch (error) {
      console.log(error);
      toast.error("Đăng xuất không thành công");
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchMe();

      set({ user });
    } catch (error) {
      console.log(error);
      set({ user: null, accessToken: null });
      toast.error("Lỗi xảy ra khi lấy dữ liệu từ người dùng");
    } finally {
      set({ loading: false });
    }
  },
  refresh: async () => {
    try {
      set({ loading: true });
      const { user, fetchMe, setAccessToken } = get();
      const accessToken = await authService.refresh();
      setAccessToken(accessToken);
      if (!user) {
        await fetchMe();
      }
    } catch (error) {
      console.log(error);
      toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại")
      get().clearState();
    } finally {
      set({ loading: false });
    }
  },
}));
