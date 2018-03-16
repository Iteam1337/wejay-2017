/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TrackInfo
// ====================================================

export type TrackInfo_album_images = {
  height: number,
  url: string,
  width: number
};

export type TrackInfo_album = {
  images: Array<TrackInfo_album_images>,
  name: string
};

export type TrackInfo_artists = {
  name: string
};

export type TrackInfo_user = {
  email: string,
  id: string
};

export type TrackInfo = {
  album: TrackInfo_album,
  artists: Array<TrackInfo_artists>,
  duration: number,
  name: string,
  spotifyUri: string,
  started: ?number,
  user: ?TrackInfo_user
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
