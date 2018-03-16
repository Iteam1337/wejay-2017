/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SearchTrackInfo
// ====================================================

export type SearchTrackInfo_album_images = {
  height: number,
  url: string,
  width: number
};

export type SearchTrackInfo_album = {
  images: Array<SearchTrackInfo_album_images>,
  name: string
};

export type SearchTrackInfo_artists = {
  name: string
};

export type SearchTrackInfo = {
  album: SearchTrackInfo_album,
  artists: Array<SearchTrackInfo_artists>,
  duration: number,
  name: string,
  spotifyUri: string
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
