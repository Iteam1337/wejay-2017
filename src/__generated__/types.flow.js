/* @flow */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type QueueInput = {|
  roomName: string,
  spotifyId: string,
  userId: string,
|};

export type JoinRoomInput = {|
  roomName: string,
  email: string,
|};

export type queueTrackMutationVariables = {|
  input: QueueInput,
|};

export type queueTrackMutation = {|
  queueTrack: {|
    album: {|
      images:  Array< {|
        url: string,
      |} >,
      name: string,
    |},
    artists:  Array< {|
      name: string,
    |} >,
    duration: number,
    name: string,
    spotifyUri: string,
    user: {|
      email: string,
      id: string,
    |},
  |},
|};

export type joinRoomMutationVariables = {|
  input: JoinRoomInput,
|};

export type joinRoomMutation = {|
  joinRoom: {|
    name: string,
  |},
|};

export type RoomQueryQueryVariables = {|
  name: string,
|};

export type RoomQueryQuery = {|
  room: {|
    currentTrack: ? {|
      album: {|
        images:  Array< {|
          height: number,
          url: string,
          width: number,
        |} >,
        name: string,
      |},
      artists:  Array< {|
        name: string,
      |} >,
      duration: number,
      name: string,
      spotifyUri: string,
      started: ?number,
      user: {|
        email: string,
        id: string,
      |},
    |},
    name: string,
    users:  Array< {|
      email: string,
      id: string,
      lastPlay: number,
    |} >,
    queue:  Array< {|
      album: {|
        images:  Array< {|
          height: number,
          url: string,
          width: number,
        |} >,
        name: string,
      |},
      artists:  Array< {|
        name: string,
      |} >,
      duration: number,
      name: string,
      spotifyUri: string,
      started: ?number,
      user: {|
        email: string,
        id: string,
      |},
    |} >,
  |},
|};

export type queueUpdatedSubscriptionVariables = {|
  roomName: string,
|};

export type queueUpdatedSubscription = {|
  queueUpdated:  Array< {|
    album: {|
      images:  Array< {|
        height: number,
        url: string,
        width: number,
      |} >,
      name: string,
    |},
    artists:  Array< {|
      name: string,
    |} >,
    duration: number,
    name: string,
    spotifyUri: string,
    started: ?number,
    user: {|
      email: string,
      id: string,
    |},
  |} >,
|};

export type onNextTrackSubscriptionVariables = {|
  roomName: string,
|};

export type onNextTrackSubscription = {|
  onNextTrack: ? {|
    album: {|
      images:  Array< {|
        height: number,
        url: string,
        width: number,
      |} >,
      name: string,
    |},
    artists:  Array< {|
      name: string,
    |} >,
    duration: number,
    name: string,
    spotifyUri: string,
    started: ?number,
    user: {|
      email: string,
      id: string,
    |},
  |},
|};

export type usersUpdatedSubscriptionVariables = {|
  roomName: string,
|};

export type usersUpdatedSubscription = {|
  usersUpdated:  Array<? {|
    email: string,
    id: string,
    lastPlay: number,
  |} >,
|};

export type addRoomMutationVariables = {|
  roomName: string,
|};

export type addRoomMutation = {|
  addRoom: {|
    name: string,
  |},
|};

export type StartQueryQuery = {|
  rooms:  Array< {|
    name: string,
  |} >,
|};

export type TrackInfoFragment = {|
  album: {|
    images:  Array< {|
      height: number,
      url: string,
      width: number,
    |} >,
    name: string,
  |},
  artists:  Array< {|
    name: string,
  |} >,
  duration: number,
  name: string,
  spotifyUri: string,
  started: ?number,
  user: {|
    email: string,
    id: string,
  |},
|};

export type UserInfoFragment = {|
  email: string,
  id: string,
  lastPlay: number,
|};