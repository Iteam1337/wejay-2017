import './Gravatar.css'
import React from 'react'
import md5 from 'md5'

const Gravatar = ({ email, name, size }) => {
  let address = email

  if (email && email.length > 0) {
    address = md5(email)
  }

  let gravatar = `http://www.gravatar.com/avatar/${address}`

  if (size) {
    gravatar = `${gravatar}&s=${size}`
  }

  return (
    <div
      className="Gravatar"
      style={{ maxWidth: size, width: size, height: size }}
    >
      <img alt={name} className="Gravatar__image" src={gravatar} />
    </div>
  )
}

Gravatar.defaultProps = {
  email: ''
}

export default Gravatar
