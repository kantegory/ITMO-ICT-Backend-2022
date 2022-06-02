export type PostShape = {
  id?: number
  title: string
  text?: string
  link?: string
  favorite?: boolean
}

export type UserShape = {
  id?: number
  username: string
  password: string
}