/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: JoinRoom
// ====================================================

export type JoinRoom_joinRoom = {
  name: string
};

export type JoinRoom = {
  joinRoom: JoinRoom_joinRoom
};

export type JoinRoomVariables = {
  input: JoinRoomInput
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
