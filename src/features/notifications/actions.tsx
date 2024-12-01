import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../services/api-client";

export type Message = {
  id: string;
  message: string;
  read_at: string | null;
  created_at: string;
};

export const useGetNotifications = (userId?: number) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      const response = await axiosClient.get(`admin/notifications`);
      return response as unknown as Message[];
    },
    enabled: !!userId,
  });
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notification_id: string) => {
      await axiosClient.post(`admin/notifications/read/${notification_id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notification_id: string) => {
      await axiosClient.delete(`admin/notifications/${notification_id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};
