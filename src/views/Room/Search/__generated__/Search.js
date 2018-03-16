/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Search
// ====================================================

export type Search_search_album_images = {
  height: number,
  url: string,
  width: number
};

export type Search_search_album = {
  images: Array<Search_search_album_images>,
  name: string
};

export type Search_search_artists = {
  name: string
};

export type Search_search = {
  album: Search_search_album,
  artists: Array<Search_search_artists>,
  duration: number,
  name: string,
  spotifyUri: string
};

export type Search = {
  search: Array<Search_search>
};

export type SearchVariables = {
  query: string
};

//==============================================================
// START Enums and Input Objects
// All enums and input objects are included in every output file
// for now, but this will be changed soon.
// TODO: Link to issue to fix this.
//==============================================================

export type QueueInput = {
  roomName: string,
  spotifyId: string,
  userId: string
};

export type JoinRoomInput = {
  roomName: string,
  email: string
};

//==============================================================
// END Enums and Input Objects
//==============================================================
