/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomQuery
// ====================================================

export type RoomQuery_room_currentTrack_album_images = {
  height: number,
  url: string,
  width: number
};

export type RoomQuery_room_currentTrack_album = {
  images: Array<RoomQuery_room_currentTrack_album_images>,
  name: string
};

export type RoomQuery_room_currentTrack_artists = {
  name: string
};

export type RoomQuery_room_currentTrack_user = {
  email: string,
  id: string
};

export type RoomQuery_room_currentTrack = {
  album: RoomQuery_room_currentTrack_album,
  artists: Array<RoomQuery_room_currentTrack_artists>,
  duration: number,
  name: string,
  spotifyUri: string,
  started: ?number,
  user: ?RoomQuery_room_currentTrack_user
};

export type RoomQuery_room_users = {
  email: string,
  id: string,
  lastPlay: number
};

export type RoomQuery_room_queue_album_images = {
  height: number,
  url: string,
  width: number
};

export type RoomQuery_room_queue_album = {
  images: Array<RoomQuery_room_queue_album_images>,
  name: string
};

export type RoomQuery_room_queue_artists = {
  name: string
};

export type RoomQuery_room_queue_user = {
  email: string,
  id: string
};

export type RoomQuery_room_queue = {
  album: RoomQuery_room_queue_album,
  artists: Array<RoomQuery_room_queue_artists>,
  duration: number,
  name: string,
  spotifyUri: string,
  started: ?number,
  user: ?RoomQuery_room_queue_user
};

export type RoomQuery_room = {
  currentTrack: ?RoomQuery_room_currentTrack,
  isPlaying: boolean,
  name: string,
  users: Array<?RoomQuery_room_users>,
  queue: Array<RoomQuery_room_queue>
};

export type RoomQuery = {
  room: RoomQuery_room
};

export type RoomQueryVariables = {
  name: string
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
