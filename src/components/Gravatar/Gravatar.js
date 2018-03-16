// @flow

import React from 'react'
import md5 from 'md5'
import styled from 'styled-components'

type Props = {
  alt?: string,
  email?: string,
  id?: string,
  size: number,
}

const Wrap = styled.div.attrs({
  size: ({ size }) => `${size}px`,
})`
  border-radius: 100%;
  flex: 1;
  height: ${({ size }) => size};
  max-width: ${({ size }) => size || '40px'};
  overflow: hidden;
  transition: all 200ms ease-in-out;
  width: ${({ size }) => size};
`

const Avatar = styled.img`
  display: block;
  max-width: 100%;
`

const Gravatar = ({ email = '', id, alt, size }: Props) => {
  let address = email || id

  if (!address) {
    return null
  }

  if (email && email.length > 0) {
    address = md5(email)
  }

  let gravatar = `https://www.gravatar.com/avatar/${address}`

  if (size) {
    gravatar = `${gravatar}&s=${size}`
  }

  return (
    <Wrap size={size}>
      <Avatar alt={alt} src={gravatar} />
    </Wrap>
  )
}

export default Gravatar
