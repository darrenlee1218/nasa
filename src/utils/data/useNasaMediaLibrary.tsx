import { useQuery } from "@tanstack/react-query";
import { IMAGE_MEDIA_TYPE_FILTER } from "constants/nasaMediaLibrary";
import { nasaApiClient } from "utils/nasaApiClient";

export interface ExpectedNasaMediaQuerySearchResponse {
  collection: {
    href: string;
    items: {
      data: {
        location: string;
        center: string;
        description: string;
        nasa_id: string;
        title: string;
        photographer?: string;
        date_created: string;
        keywords: string[];
      }[];
      links: { href: string }[];
    }[];
  };
}

export type SearchFilterArgs = {
  startDate?: Date;
  endDate?: Date;
  searchInput?: string;
  nasaId?: string;
};

const fetchNasaMediaSearch = async (filters: SearchFilterArgs) => {
  const response =
    await nasaApiClient.get<ExpectedNasaMediaQuerySearchResponse>("/search", {
      params: getQueryParams(filters),
    });
  return response.data;
};

const getQueryParams = ({
  startDate,
  endDate,
  searchInput,
  nasaId,
}: SearchFilterArgs) => ({
  ...IMAGE_MEDIA_TYPE_FILTER,
  q: searchInput,
  media_type: "image",
  year_start: startDate?.getFullYear(),
  year_end: endDate?.getFullYear(),
  nasa_id: nasaId,
});

export const useNasaMediaSearch = (filters: SearchFilterArgs) => {
  return useQuery(
    ["/search", getQueryParams(filters)],
    () => fetchNasaMediaSearch(filters),
    {
      staleTime: 60 * 1000, // there's unlikely this data is going to change very frequently, 60s should be good for caching purposes
    }
  );
};

export const useLazyNasaMediaSearch = (filters: SearchFilterArgs) => {
  const query = useQuery(
    ["/search", getQueryParams(filters)],
    () => fetchNasaMediaSearch(filters),
    {
      staleTime: 60 * 1000, // there's unlikely this data is going to change very frequently, 60s should be good for caching purposes
    }
  );

  return { fetch: query.refetch, query };
};
