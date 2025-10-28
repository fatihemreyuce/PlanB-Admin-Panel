export interface Assets {
  asset: string;
  isCovered: boolean;
}

export interface PortfolioRequest {
  name: string;
  description: string;
  excerpt: string;
  outSourceLink: string;
  publishDate: string;
  assets: Assets[];
}

export interface PortfolioResponse {
  id: number;
  name: string;
  description: string;
  excerpt: string;
  assets: Assets[];
  outSourceLink: string;
  publishDate: string;
}
