import { useAuthStore } from "@/store/auth.store";

export const useAuth = () => {
  const user = useAuthStore((s) => s.user);
  const mockLogin = useAuthStore((s) => s.mockLogin);
  const mockLogout = useAuthStore((s) => s.mockLogout);

  return { user, mockLogin, mockLogout };
};
