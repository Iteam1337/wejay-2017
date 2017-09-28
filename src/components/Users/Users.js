import './Users.css'
import moment from 'moment'
import React from 'react'
import Gravatar from 'components/Gravatar'

const Users = ({ users }) => {
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
            moment().diff(moment(user.lastPlay), 'minutes') <= 60
          )
        })
        .sort((a, b) => b.lastPlay - a.lastPlay)
        .map(user => (
          <li className="Users__user" key={user.id}>
            <Gravatar email={user.email} size={30} />
            <div className="Users__email">{user.email}</div>
            <div className="Users__lastPlay">
              {moment(user.lastPlay).fromNow()}
            </div>
          </li>
        ))}
    </ul>
  )
}

export default Users
