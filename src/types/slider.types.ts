import type { TagResponse } from "@/types/tags.types";

export interface SliderRequest {
  name: string;
  description: string;
  excerpt: string;
  image: string | File;
  tagIds: number[];
}

export interface SliderResponse {
  id: number;
  name: string;
  description: string;
  excerpt: string;
  image: string;
  tags: TagResponse[];
}
