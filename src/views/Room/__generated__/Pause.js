

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Pause
// ====================================================

export type Pause = {
  pause: ?boolean
};

export type PauseVariables = {
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