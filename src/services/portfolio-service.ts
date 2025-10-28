import { fetchClient } from "@/utils/fetch-client";
import type {
  PortfolioRequest,
  PortfolioResponse,
} from "@/types/portfolio.types";
import type { Page } from "@/types/pagination";

export const createPortfolio = (request: PortfolioRequest) => {
  return fetchClient<PortfolioRequest, PortfolioResponse>("/admin/portfolios", {
    method: "POST",
    body: request,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getPortfolios = (
  search: string,
  page: number,
  size: number,
  sort: string
) => {
  return fetchClient<void, Page<PortfolioResponse>>(
    `/portfolios?search=${search}&page=${page}&size=${size}&sort=${sort}`,
    {
      method: "GET",
    }
  );
};

export const getPortfolioById = (id: number) => {
  return fetchClient<void, PortfolioResponse>(`/portfolios/${id}`, {
    method: "GET",
  });
};

export const updatePortfolio = (id: number, request: PortfolioRequest) => {
  return fetchClient<PortfolioRequest, PortfolioResponse>(
    `/admin/portfolios/${id}`,
    {
      method: "PUT",
      body: request,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const deletePortfolio = (id: number) => {
  return fetchClient<void, void>(`/admin/portfolios/${id}`, {
    method: "DELETE",
  });
};
