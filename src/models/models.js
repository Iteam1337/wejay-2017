// @flow

export type Track = {
  id: string | number,
  name: string
}

export type Room = {
  name: string,
  users: number,
  currentSong: ?Track
}
