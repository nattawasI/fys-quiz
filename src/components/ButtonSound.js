import React from 'react'
import PropTypes from 'prop-types'
import {useSoundStateContext, useSoundActionContext} from '../contexts/SoundContext'
import IconSound from '../assets/images/icon/icon_sound.svg'
import IconSoundBlack from '../assets/images/icon/icon_sound_black.svg'
import IconMute from '../assets/images/icon/icon_mute.svg'
import IconMuteBlack from '../assets/images/icon/icon_mute_black.svg'
import {playClick} from '../variables/SoundMethod'

const ButtonSound = ({dark}) => {
  // context
  const {toggleMuteSoundContext} = useSoundActionContext()
  const {muteContext} = useSoundStateContext()

  const handleClick = () => {
    playClick(muteContext)
    toggleMuteSoundContext()
  }

  return (
    <button
      type="button"
      className="button-sound"
      onClick={handleClick}>
      {
        muteContext
        ? <img src={dark ? IconMuteBlack: IconMute} alt="" />
        : <img src={dark ? IconSoundBlack: IconSound} alt="" />
      }
    </button>
  )
}

ButtonSound.propTypes = {
  dark: PropTypes.bool,
}

ButtonSound.defaultProps = {
  dark: false,
}

export default ButtonSound
