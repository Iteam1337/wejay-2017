import './Gravatar.css'
import React from 'react'
import md5 from 'md5'
import classnames from 'classnames'

type GravatarProps = {
  alt?: string,
  className?: string,
  email?: string,
  id?: string,
  size: number
}

const Gravatar = ({ className, email, id, alt, size }: GravatarProps) => {
  let address = email || id

  if (email && email.length > 0) {
    address = md5(email)
  }

  let gravatar = `https://www.gravatar.com/avatar/${address}`

  if (size) {
    gravatar = `${gravatar}&s=${size}`
  }

  return (
    <div
      className={classnames('Gravatar', className)}
      style={{ maxWidth: size, width: size, height: size }}
    >
      <img alt={alt} className="Gravatar__image" src={gravatar} />
    </div>
  )
}

Gravatar.defaultProps = {
  email: ''
}

export default Gravatar
