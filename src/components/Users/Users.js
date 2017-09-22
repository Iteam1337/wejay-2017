import './Users.css'
import React from 'react'
import Gravatar from 'components/Gravatar'

const Users = ({ users }) => {
  if (!users.length) {
    return null
  }

  return (
    <ul className="Users">
      {users.map(user => (
        <li className="Users__user" key={user.id}>
          <Gravatar email={user.email} size={30} />
          <div className="Users__email">{user.email}</div>
        </li>
      ))}
    </ul>
  )
}

export default Users
