import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

import LoginForm from '../forms/loginForm'

function Login() {
  return (
    <div className="onboarding">
      <Card title="Basket" className="onboarding__card">
        <div className="onboarding__form-container">
          <h3 className="onboarding__form-title">Welcome Back</h3>
          <LoginForm />
        </div>
        <div className="onboarding__footer">
          <p className="onboarding__footer-text">
            Don't have an account? <Link to="/signUp">Sign up</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Login
