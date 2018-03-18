// @flow

import React from 'react'
import { Formik, Form } from 'formik'
import yup from 'yup'
import Button from '../../components/Button/Button'
import FormInput from '../../components/FormElements/FormInput'

export type FormValues = {
  email: string,
}

type Props = {
  saveUser: (formValues: FormValues) => Promise<void>,
}

const validateUser = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
})

const AddUserForm = ({ saveUser }: Props) => {
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={saveUser}
      render={({ isValid }) => (
        <Form>
          <FormInput dataCy="email" name="email" placeholder="E-mail" />

          <Button disabled={!isValid} type="submit">
            Save user
          </Button>
        </Form>
      )}
      validationSchema={validateUser}
    />
  )
}

export default AddUserForm
