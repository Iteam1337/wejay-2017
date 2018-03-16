

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: RoomUpdated
// ====================================================

export type RoomUpdated_roomUpdated_currentTrack_album_images = {
  height: number,
  url: string,
  width: number,
};

export type RoomUpdated_roomUpdated_currentTrack_album = {
  images: Array<RoomUpdated_roomUpdated_currentTrack_album_images>,
  name: string,
};

export type RoomUpdated_roomUpdated_currentTrack_artists = {
  name: string
};

export type RoomUpdated_roomUpdated_currentTrack_user = {
  email: string,
  id: string,
};

export type RoomUpdated_roomUpdated_currentTrack = {
  album: RoomUpdated_roomUpdated_currentTrack_album,
  artists: Array<RoomUpdated_roomUpdated_currentTrack_artists>,
  duration: number,
  name: string,
  spotifyUri: string,
  started: ?number,
  user: ?RoomUpdated_roomUpdated_currentTrack_user,
};

export type RoomUpdated_roomUpdated_users = {
  email: string,
  id: string,
  lastPlay: number,
};

export type RoomUpdated_roomUpdated_queue_album_images = {
  height: number,
  url: string,
  width: number,
};

export type RoomUpdated_roomUpdated_queue_album = {
  images: Array<RoomUpdated_roomUpdated_queue_album_images>,
  name: string,
};

export type RoomUpdated_roomUpdated_queue_artists = {
  name: string
};

export type RoomUpdated_roomUpdated_queue_user = {
  email: string,
  id: string,
};

export type RoomUpdated_roomUpdated_queue = {
  album: RoomUpdated_roomUpdated_queue_album,
  artists: Array<RoomUpdated_roomUpdated_queue_artists>,
  duration: number,
  name: string,
  spotifyUri: string,
  started: ?number,
  user: ?RoomUpdated_roomUpdated_queue_user,
};

export type RoomUpdated_roomUpdated = {
  currentTrack: ?RoomUpdated_roomUpdated_currentTrack,
  isPlaying: boolean,
  name: string,
  users: Array<?RoomUpdated_roomUpdated_users>,
  queue: Array<RoomUpdated_roomUpdated_queue>,
};

export type RoomUpdated = {
  roomUpdated: ?RoomUpdated_roomUpdated
};

export type RoomUpdatedVariables = {
  roomName: string
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
  userId: string,
};

export type JoinRoomInput = {
  roomName: string,
  email: string,
};

//==============================================================
// END Enums and Input Objects
//==============================================================