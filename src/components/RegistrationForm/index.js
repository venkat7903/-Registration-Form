// Write your JS code here
import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstNameInput: '',
    lastNameInput: '',
    isFirstNameError: false,
    isLastNameError: false,
    isSubmitPage: true,
  }

  validateFirstName = () => {
    const {firstNameInput} = this.state
    return firstNameInput === ''
  }

  validateLastName = () => {
    const {lastNameInput} = this.state
    return lastNameInput === ''
  }

  onSubmitForm = event => {
    event.preventDefault()

    const isFirstNameValid = this.validateFirstName()
    const isLastNameValid = this.validateLastName()

    if (!isFirstNameValid && !isLastNameValid) {
      this.setState({isSubmitPage: false})
    } else {
      this.setState({
        isFirstNameError: isFirstNameValid,
        isLastNameError: isLastNameValid,
        isSubmitPage: true,
      })
    }
  }

  onChangeFirstName = event => {
    this.setState({firstNameInput: event.target.value})
  }

  onBlurFirstName = () => {
    const isValidName = this.validateFirstName()
    this.setState({isFirstNameError: isValidName})
  }

  onChangeLastName = event => {
    this.setState({lastNameInput: event.target.value})
  }

  onBlurLastName = () => {
    const isValidName = this.validateLastName()
    this.setState({isLastNameError: isValidName})
  }

  onSubmitAnotherResponse = () => {
    this.setState({isSubmitPage: true, firstNameInput: '', lastNameInput: ''})
  }

  getErrorMsg = () => <p className="error-msg">Required</p>

  renderForm = () => {
    const {
      isFirstNameError,
      firstNameInput,
      isLastNameError,
      lastNameInput,
    } = this.state
    const firstNameErrorMsg = isFirstNameError ? 'error-input-field' : ''
    const lastNameErrorMsg = isLastNameError ? 'error-input-field' : ''
    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        <div className="input-label-container">
          <label htmlFor="firstName" className="label-field">
            FIRST NAME
          </label>
          <input
            type="text"
            id="firstName"
            className={`input-field ${firstNameErrorMsg}`}
            placeholder="First name"
            onBlur={this.onBlurFirstName}
            onChange={this.onChangeFirstName}
            value={firstNameInput}
          />
          {isFirstNameError && this.getErrorMsg()}
        </div>
        <div className="input-label-container">
          <label htmlFor="lastName" className="label-field">
            LAST NAME
          </label>
          <input
            type="text"
            id="lastName"
            className={`input-field ${lastNameErrorMsg}`}
            placeholder="Last name"
            onBlur={this.onBlurLastName}
            onChange={this.onChangeLastName}
            value={lastNameInput}
          />
          {isLastNameError && this.getErrorMsg()}
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    )
  }

  renderRegistrationSuccess = () => (
    <div className="submit-success-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-img"
      />
      <p className="desc">Submitted Successfully</p>
      <button
        type="button"
        className="submit-response-btn"
        onClick={this.onSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </div>
  )

  render() {
    const {isSubmitPage} = this.state
    return (
      <div className="registration-app-container">
        <div className="sub-registration-app-container">
          <h1 className="app-title">Registration</h1>
          {isSubmitPage ? this.renderForm() : this.renderRegistrationSuccess()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
