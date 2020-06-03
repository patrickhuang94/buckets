import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Form, Input, Button } from 'antd'
const { Item } = Form

const styles = {
  formInputLabel: {
    marginBottom: 0,
    lineHeight: '20px',
  },
}

function SignUpForm() {
  const history = useHistory()
  const [fields, setFields] = useState({})
  const [error, setError] = useState()

  const submitForm = async (event) => {
    event.preventDefault()
    const name = fields.fullName.split(' ')
    const firstName = name[0]
    const lastName = name[1]

    const request = {
      method: 'POST',
      url: '/auth/sign_up',
      data: {
        email: fields.email,
        password: fields.password,
        firstName,
        lastName,
      },
    }

    try {
      const user = await axios(request)
      console.log('user: ', user)
      dispatchEvent({ type: 'LOG_IN', payload: user })
      history.push('/')
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message)
      }
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
      <p style={styles.formInputLabel}>{label}</p>
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
      {formInputItem({
        label: 'Full Name',
        name: 'fullName',
        value: fields.fullName,
      })}
      <Item>
        <Button type="primary" htmlType="submit" block disabled={!fields.email || !fields.password || !fields.fullName}>
          Sign Up
        </Button>
      </Item>
      {error && <div>{error}</div>}
    </Form>
  )
}

export default SignUpForm
