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

export type pauseMutationVariables = {|
  roomName: string,
|};

export type pauseMutation = {|
  pause: ?boolean,
|};

export type playMutationVariables = {|
  roomName: string,
|};

export type playMutation = {|
  play: ?boolean,
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
      user: ? {|
        email: string,
        id: string,
      |},
    |},
    isPlaying: boolean,
    name: string,
    users:  Array<? {|
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
      user: ? {|
        email: string,
        id: string,
      |},
    |} >,
  |},
|};

export type roomUpdatedSubscriptionVariables = {|
  roomName: string,
|};

export type roomUpdatedSubscription = {|
  roomUpdated: ? {|
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
      user: ? {|
        email: string,
        id: string,
      |},
    |},
    isPlaying: boolean,
    name: string,
    users:  Array<? {|
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
      user: ? {|
        email: string,
        id: string,
      |},
    |} >,
  |},
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
    user: ? {|
      email: string,
      id: string,
    |},
  |},
|};

export type searchMutationVariables = {|
  query: string,
|};

export type searchMutation = {|
  search:  Array< {|
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

export type joinRoomMutationVariables = {|
  input: JoinRoomInput,
|};

export type joinRoomMutation = {|
  joinRoom: {|
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
  user: ? {|
    email: string,
    id: string,
  |},
|};

export type UserInfoFragment = {|
  email: string,
  id: string,
  lastPlay: number,
|};

export type SearchTrackInfoFragment = {|
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
|};