// @flow

import * as React from 'react'
import styled from 'styled-components'

type Props = {
  'data-test'?: string,
  children: React.Node,
  disabled?: boolean,
  onClick?: () => Promise<void>,
  type?: 'button' | 'submit',
}

const StyledButton = styled.button`
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: #2d3339;
  border: 0;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
  transition: background-color 150ms ease-in-out, opacity 200ms ease-in-out;
  width: 100%;

  &:hover {
    background-color: #363d45;
  }

  &:active,
  &:focus {
    background-color: #fcc169;
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const Button = ({
  children,
  'data-test': dataTest,
  disabled,
  onClick,
  type = 'button',
}: Props) => {
  return (
    <StyledButton
      data-test={dataTest}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </StyledButton>
  )
}

export default Button
