interface Props {
  resources: string
}

export default function useQueryKeyFactory({ resources }: Props) {
  const keys = {
    all: [resources],
    lists: () => [...keys.all, "list"],
    list: (params: object) => [...keys.lists(), params],
    details: () => [...keys.all, "detail"],
    detail: (id: string | number) => [...keys.details(), id],
  }

  return keys
}
