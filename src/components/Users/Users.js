// @flow

import './Users.css'
import * as WejayApi from '__generated__/types.flow.js'
import React from 'react'
import Gravatar from 'components/Gravatar'
import differenceInMinutes from 'date-fns/difference_in_minutes'
import distanceInWords from 'date-fns/distance_in_words'

type Props = {
  users: $PropertyType<$PropertyType<WejayApi.RoomQueryQuery, 'room'>, 'users'>,
}

const Users = ({ users }: Props) => {
  if (!users.length) {
    return null
  }

  return (
    <ul className="Users">
      {users
        .slice()
        .filter(user => {
          return (
            user.lastPlay !== 0 &&
            differenceInMinutes(new Date(), user.lastPlay) <= 60
          )
        })
        .sort((a, b) => b.lastPlay - a.lastPlay)
        .map(user => (
          <li className="Users__user" key={user.id}>
            <Gravatar email={user.email} size={30} />
            <div className="Users__email">{user.email}</div>
            <div className="Users__lastPlay">
              {distanceInWords(user.lastPlay, new Date(), { addSuffix: true })}
            </div>
          </li>
        ))}
    </ul>
  )
}

export default Users
