import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

import SignUpForm from '../forms/signUpForm'

function SignUp() {
  return (
    <div className="onboarding">
      <Card title="Basket" className="onboarding__card">
        <div className="onboarding__form-container">
          <h3 className="onboarding__form-title">Create New Account</h3>
          <SignUpForm />
        </div>
        <div className="onboarding__footer">
          <p className="onboarding__footer-text">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default SignUp
