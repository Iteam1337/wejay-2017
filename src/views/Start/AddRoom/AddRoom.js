// @flow

import React from 'react'
import * as WejayApi from './__generated__/AddRoom'
import { Formik, Form } from 'formik'
import yup from 'yup'
import Button from '../../../components/Button/Button'
import FormInput from '../../../components/FormElements/FormInput'

type Props = {
  addRoom: (formValues: WejayApi.AddRoomVariables) => void,
}

const validateRoom = yup.object().shape({
  roomName: yup.string().required(),
})

const AddRoom = ({ addRoom }: Props) => {
  return (
    <Formik
      initialValues={{ roomName: '' }}
      onSubmit={addRoom}
      render={({ errors, isValid }) => (
        <Form>
          <FormInput
            data-test="input-room-name"
            name="roomName"
            placeholder="Room name"
          />

          {errors.roomName && (
            <div data-test="error-room-name">{errors.roomName}</div>
          )}

          <Button data-test="btn-add-room" disabled={!isValid} type="submit">
            Add new room
          </Button>
        </Form>
      )}
      validationSchema={validateRoom}
    />
  )
}

export default AddRoom
