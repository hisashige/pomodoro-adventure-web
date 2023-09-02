interface Item {
  id: number
  [key: string]: any
}
export const createId = (items: Item[]): number => {
  return items.reduce((maxId, item) => (item.id > maxId ? item.id : maxId), 0) + 1
}
