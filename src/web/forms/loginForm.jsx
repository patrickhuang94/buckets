import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import normalizeAxios from '../services/normalizeAxios'
import { Form, Input, Button } from 'antd'
import { store } from '../store'

function LoginForm() {
  const history = useHistory()
  const [error, setError] = useState(null)
  const { dispatch } = useContext(store)

  const submitForm = async (values) => {
    const request = {
      method: 'POST',
      url: '/auth/login',
      data: {
        email: values.email,
        password: values.password,
      },
    }

    try {
      const user = await normalizeAxios(request)
      dispatch({ type: 'LOG_IN', payload: user })
      history.push('/')
    } catch (err) {
      const error = err.response && err.response.data
      setError(error)
    }
  }

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Log In
        </Button>
      </Form.Item>
      <div style={{ marginBottom: '16px', height: '21px' }}>
        {error && <p style={{ color: 'salmon' }}>{error}</p>}
      </div>
    </Form>
  )
}

export default LoginForm
