import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {motion, AnimatePresence} from 'framer-motion'
import {containerVariant} from '../variable/MotionVariant'
import {useUserStateContext} from '../context/UserContext'
import UseWindowSmall from '../utilityhook/useWindowSmall'
import Content from '../layout/Content'
import ButtonBack from '../component/ButtonBack'
import ButtonNext from '../component/ButtonNext'
import ButtonSound from '../component/ButtonSound'
import ImgFriendSleepMd from '../image/page/friend-sleep/img_friend_sleep_md.svg'
import ImgFriendSleepSm from '../image/page/friend-sleep/img_friend_sleep_sm.svg'
import ImgArmMd from '../image/page/friend-sleep/img_arm_md.svg'
import ImgArmSm from '../image/page/friend-sleep/img_arm_sm.svg'

// Motion Variants
const textVariant = {
  hidden: {
    y: 70,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 0.7,
      delay: 0.5,
    }
  }
}

const armVariant = {
  hidden: {
    x: '50%',
    y: '100%',
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 1,
      delay: 1
    }
  }
}

const buttonVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 1,
      delay: 3
    }
  }
}

const WakeFriendUp = () => {
  const { friendInfoContext } = useUserStateContext()
  const isWindowSmall = UseWindowSmall()
  const history = useHistory()

  // motion variant which has dynamic
  const wakeVariant = {
    animate: {
      y: isWindowSmall ? [0, -10, 0, -10, 0]: [0, -20, 0, -20, 0],
      transition: {
        type: 'tween',
        duration: 1,
        delay: 2
      }
    },
  }

  // state
  const [skipAnimate, setSkipAnimate] = useState(false)
  const [animateComplete, setAnimateComplete] = useState(false)

  // function
  const touchPanelSm = () => {
    if (isWindowSmall) {
      if (animateComplete) {
        history.push('/call-police')
      } else {
        if (!skipAnimate) {
          setAnimateComplete(true)
          setSkipAnimate(true)
        }
      }
    }
  }

  // function for rendering
  const renderText = () => {
    if (isWindowSmall){
      return (
        skipAnimate
        ? <p className="box-story__text text-story">คุณพยายามปลุก { friendInfoContext.name }<br />ให้ไปนอนบนที่นอน</p>
        : <AnimatePresence>
            <motion.p className="box-story__text text-story"
              variants={textVariant}
              initial="hidden"
              animate="show"
            >คุณพยายามปลุก { friendInfoContext.name }<br />ให้ไปนอนบนที่นอน</motion.p>
          </AnimatePresence>
      )
    } else {
      return (
        <>
          <motion.p className="box-story__text text-story"
            variants={textVariant}
            initial="hidden"
            animate="show"
          >คุณพยายามปลุก { friendInfoContext.name }<br />ให้ไปนอนบนที่นอน</motion.p>
          <motion.div className="box-story__button"
            variants={buttonVariant}
            initial="hidden"
            animate="show"
          >
            <ButtonNext to="/call-police" />
          </motion.div>
        </>
      )
    }
  }

  const renderArm = () => {
    if (isWindowSmall) {
      return (
        skipAnimate
        ? <div className="friend-sleep__arm">
            <img src={isWindowSmall ? ImgArmSm : ImgArmMd} alt="แขน" />
          </div>
        : <AnimatePresence>
            <motion.div
              className="friend-sleep__arm"
              variants={armVariant}
              initial="hidden"
              animate="show"
            >
              <motion.img
                src={isWindowSmall ? ImgArmSm : ImgArmMd}
                alt="แขน"
                variants={wakeVariant}
                animate="animate"
                onAnimationComplete={ () => setAnimateComplete(true) }
              />
            </motion.div>
          </AnimatePresence>
      )
    } else {
      return (
        <motion.div
          className="friend-sleep__arm"
          variants={armVariant}
          initial="hidden"
          animate="show"
        >
          <motion.img
            src={isWindowSmall ? ImgArmSm : ImgArmMd}
            alt="แขน"
            variants={wakeVariant}
            animate="animate"
            onAnimationComplete={ () => setAnimateComplete(true) }
          />
        </motion.div>
      )
    }
  }

  return (
    <>
      <ButtonBack to="/friend-sleep" />
      <ButtonSound />
      <Content>
        <motion.div className="scene-panel friend-sleep"
          variants={containerVariant}
          initial="hidden"
          animate="show"
          exit="exit"
          onClick={touchPanelSm}
        >
          <div className="friend-sleep__text box-story">
            {
              renderText()
            }
          </div>
          <div className="friend-sleep__friend">
            <img src={isWindowSmall ? ImgFriendSleepSm: ImgFriendSleepMd} alt="เพื่อนนอนสลบอยู่บนโต๊ะกินข้าว" />
          </div>
          {
            renderArm()
          }
        </motion.div>
      </Content>
    </>
  )
}

export default WakeFriendUp
