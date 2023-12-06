export type URLObject = {
  url: string
}

export type Node = {
  [key: string]: URLObject | Node
}

export type Data = {
  [year: string]: Node
}
