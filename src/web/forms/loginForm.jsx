import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import normalizeAxios from '../services/normalizeAxios'
import { Form, Input, Button } from 'antd'
const { Item } = Form
import { store } from '../store'

function LoginForm() {
  const history = useHistory()
  const [fields, setFields] = useState({})
  const [error, setError] = useState(null)
  const { state, dispatch } = useContext(store)

  const submitForm = async () => {
    event.preventDefault()
    const request = {
      method: 'POST',
      url: '/auth/login',
      data: {
        email: fields.email,
        password: fields.password,
      },
    }

    try {
      const user = await normalizeAxios(request)
      dispatch({ type: 'LOG_IN', payload: user })
      console.log({ state })
      history.push('/')
    } catch (err) {
      const error = err.response && err.response.data
      setError(error)
    }
  }

  const handleChange = (event, name) => {
    event.persist()
    setFields({
      ...fields,
      [name]: event.target.value,
    })
  }

  const formInputItem = ({ label, placeholder, value, name, type }) => (
    <Item>
      <p className="form__input-label">{label}</p>
      <Input placeholder={placeholder} value={value} onChange={(event) => handleChange(event, name)} type={type} />
    </Item>
  )

  return (
    <Form onSubmit={submitForm}>
      {formInputItem({
        label: 'Email',
        name: 'email',
        placeholder: 'john@gmail.com',
        value: fields.email,
      })}
      {formInputItem({
        label: 'Password',
        name: 'password',
        value: fields.password,
        type: 'password',
      })}
      <Item>
        <Button type="primary" htmlType="submit" block disabled={!fields.email || !fields.password}>
          Log In
        </Button>
      </Item>
      <div style={{ marginBottom: '16px', height: '21px' }}>{error && <p style={{ color: 'salmon' }}>{error}</p>}</div>
    </Form>
  )
}

export default LoginForm
