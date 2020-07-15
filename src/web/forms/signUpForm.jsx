import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Form, Input, Button } from 'antd'
const { Item } = Form

function SignUpForm() {
  const history = useHistory()
  const [error, setError] = useState()

  const submitForm = async (values) => {
    event.preventDefault()
    const name = values.fullName.split(' ')
    const firstName = name[0]
    const lastName = name[1]

    const request = {
      method: 'POST',
      url: '/auth/sign_up',
      data: {
        email: values.email,
        password: values.password,
        firstName,
        lastName,
      },
    }

    try {
      const user = await axios(request)
      dispatchEvent({ type: 'LOG_IN', payload: user })
      history.push('/')
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message)
      }
    }
  }

  return (
    <Form onFinish={submitForm}>
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input.Password />
      </Form.Item>
      <Form.Item label="Full Name" name="fullName">
        <Input />
      </Form.Item>
      <Item>
        <Button type="primary" htmlType="submit" block>
          Sign Up
        </Button>
      </Item>
      {error && <div>{error}</div>}
    </Form>
  )
}

export default SignUpForm
