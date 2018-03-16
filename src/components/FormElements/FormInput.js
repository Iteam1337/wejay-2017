// @flow

import React from 'react'
import { Field } from 'formik'
import styled from 'styled-components'

type Props = {
  name: string,
  placeholder?: string,
}

const StyledField = styled(Field)`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;

  &:focus {
    outline-color: #fcc169;
    outline-offset: 2px;
    outline-style: solid;
    outline-width: 2px;
  }
`

const FormInput = ({ name, placeholder }: Props) => {
  return <StyledField name={name} placeholder={placeholder} />
}

export default FormInput
