// @flow

export type Album = {
  images: {
    url: string
  }[]
}

export type Artist = {
  name: string
}

export type Track = {
  album: Album,
  artists: Artist[],
  duration: number,
  id: string | number,
  name: string,
  spotifyUri: string,
  started: number,
  user: {
    id: string
  }
}

export type Room = {
  name: string,
  users: number,
  currentSong: ?Track
}
