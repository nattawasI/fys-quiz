import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {useUserStateContext, useUserActionContext} from '../contexts/UserContext'
import ButtonNext from './ButtonNext'
import InputText from './InputText'

const FormYourName = ({changeScene, checkAnimate}) => {
  // context
  const {userInfoContext} = useUserStateContext()
  const {addUserNameContext} = useUserActionContext()

  // ref
  const inputRef = useRef(null)

  // state
  const [error, setError] = useState(false)

  const submitForm = (e) => {
    e.preventDefault()
    const inputValue = inputRef.current.value

    if (inputValue) {
      addUserNameContext(inputValue)
      changeScene()
    } else {
      setError(true)
    }
  }

  return (
    <div className="form-your-name">
      <form onSubmit={submitForm}>
        <div className="form-your-name__form"
        >
          <div className="form-your-name__label text-story">สวัสดีครับคุณ?</div>
          <div className="form-your-name__input">
            <InputText
              ref={inputRef}
              value={userInfoContext.name}
              isError={error}
              placeholder="ชื่อตัวเอง"
            />
          </div>
        </div>
        <div className="form-your-name__button">
          <ButtonNext onClick={submitForm} animateCompleted={checkAnimate} />
        </div>
      </form>
    </div>
  )
}

FormYourName.propTypes = {
  changeScene: PropTypes.func,
  checkAnimate: PropTypes.bool,
}

FormYourName.defaultProps = {
  changeScene: () => {},
  checkAnimate: false,
}

export default FormYourName
