import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import axios from "axios"
import useQueryKeyFactory from "./useQueryKeyFactory"

interface UseListProps {
  resources: string
  version?: string
  params?: object
}

interface PaginatedResponseType<T> {
  results: T[]
}

export function useList<T>({
  resources,
  params = {},
  version = "v1",
}: UseListProps) {
  const keys = useQueryKeyFactory({ resources })

  const query = useInfiniteQuery<PaginatedResponseType<T>>(
    keys.list(params),
    () =>
      axios
        .get(`/api/${version}/${resources}/`, { params })
        .then(({ data }) => data),
    {
      keepPreviousData: true,
    }
  )

  const data = query.data?.pages.map(({ results }) => results).flat() ?? []

  return { query, data }
}

interface UseDetailProps extends UseListProps {
  id: string | number
}

export function useDetail<T>({
  resources,
  params,
  id,
  version = "v1",
}: UseDetailProps) {
  const keys = useQueryKeyFactory({ resources })

  const query = useQuery<T>(keys.detail(id), () =>
    axios
      .get(`/api/${version}/${resources}/${id}/`, { params })
      .then(({ data }) => data)
  )

  return { query, data: query.data }
}
