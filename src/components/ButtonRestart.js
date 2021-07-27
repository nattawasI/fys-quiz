// กลับสู่หน้าเริ่มต้น
import React from 'react'
import PropTypes from 'prop-types'
import {useSoundStateContext} from '../contexts/SoundContext'
import ClickAudio from '../assets/sounds/sound-click.mp3'

const soundClick = new Audio(ClickAudio)

const ButtonRestart = ({onClick}) => {
  // context
  const {muteContext} = useSoundStateContext()

  const playSoundClickSound = () => {
    if (!muteContext) {
      soundClick.play()
    }
  }

  const handleClick = () => {
    playSoundClickSound()
    onClick()
  }

  return (
    <button type="button" className="button-restart" onClick={handleClick}>
      กลับสู่หน้าเริ่มต้น
    </button>
  )
}

ButtonRestart.propTypes = {
  onClick: PropTypes.func,
}

ButtonRestart.defaultProps = {
  onClick: () => {},
}

export default ButtonRestart