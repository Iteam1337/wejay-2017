

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: QueueTrack
// ====================================================

export type QueueTrack_queueTrack_album_images = {
  url: string
};

export type QueueTrack_queueTrack_album = {
  images: Array<QueueTrack_queueTrack_album_images>,
  name: string,
};

export type QueueTrack_queueTrack_artists = {
  name: string
};

export type QueueTrack_queueTrack_user = {
  email: string,
  id: string,
};

export type QueueTrack_queueTrack = {
  album: QueueTrack_queueTrack_album,
  artists: Array<QueueTrack_queueTrack_artists>,
  duration: number,
  name: string,
  spotifyUri: string,
  user: ?QueueTrack_queueTrack_user,
};

export type QueueTrack = {
  queueTrack: QueueTrack_queueTrack
};

export type QueueTrackVariables = {
  input: QueueInput
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