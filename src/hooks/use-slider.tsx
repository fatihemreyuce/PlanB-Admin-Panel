import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSlider,
  getSliders,
  getSliderById,
  updateSlider,
  deleteSlider,
} from "@/services/slider-service";
import { toast } from "sonner";
import type { SliderRequest } from "@/types/slider.types";

export const useCreateSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: SliderRequest) => createSlider(request),
    onSuccess: () => {
      toast.success("Slider başarıyla oluşturuldu");
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
    },
    onError: () => {
      toast.error("Slider oluşturulurken bir hata oluştu");
    },
  });
};

export const useSliders = (page: number, size: number, sort: string) => {
  return useQuery({
    queryKey: ["sliders", page, size, sort],
    queryFn: () => getSliders(page, size, sort),
  });
};

export const useSliderById = (id: number) => {
  return useQuery({
    queryKey: ["slider", id],
    queryFn: () => getSliderById(id),
  });
};

export const useUpdateSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: SliderRequest }) =>
      updateSlider(id, request),
    onSuccess: () => {
      toast.success("Slider başarıyla güncellendi");
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
    },
    onError: () => {
      toast.error("Slider güncellenirken bir hata oluştu");
    },
  });
};

export const useDeleteSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteSlider(id),
    onSuccess: () => {
      toast.success("Slider başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
    },
    onError: () => {
      toast.error("Slider silinirken bir hata oluştu");
    },
  });
};
