import React from 'react'
import PropTypes from 'prop-types'
import {motion} from 'framer-motion'

const buttonVariant = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 0.7
    }
  },
}

const ButtonBack = ({dark, onClick}) => {

  const classStyle = () => {
    return dark ? 'button-back button-back--dark' : 'button-back'
  }

  const handleClick = () => {
    onClick()
  }

  return (
    <motion.button
      type="button"
      className={classStyle()}
      onClick={handleClick}
      variants={buttonVariant}
      initial="hidden"
      animate="show"
    >
      ย้อนกลับ
    </motion.button>
  )
}

ButtonBack.propTypes = {
  dark: PropTypes.bool,
  path: PropTypes.string,
}

ButtonBack.defaultProps = {
  dark: false,
  path: '',
}

export default ButtonBack
