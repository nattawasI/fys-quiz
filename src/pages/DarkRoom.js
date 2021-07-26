import React, {useState} from 'react'
import {useRouteActionContext} from '../contexts/RouteContext'
import {useSoundActionContext} from '../contexts/SoundContext'
import {motionVariables} from '../variables/MotionVariant'
import {motion, AnimatePresence} from 'framer-motion'
import UseWindowSmall from '../utilityhooks/useWindowSmall'
import Content from '../layout/Content'
import ButtonNext from '../components/ButtonNext'
import bgSceneMD from '../assets/images/page/darkroom/bg_scene_01_md.svg'
import bgSceneSM from '../assets/images/page/darkroom/bg_scene_01_sm.svg'

// Motion Variants
const textVariantMD = {
  hidden: {
    opacity: 0,
  },
  show: {
    y: ["0%", "0%", "-100%"],
    opacity: [0, 1, 1],
    transition: {
      duration: motionVariables.speed.speedTwo,
      ease: "easeInOut",
      times: [0, 0.6, 1],
      delay: motionVariables.speed.speedOne
    }
  },
}

const textVariantSM = {
  hidden: {
    y: "5%",
    opacity: 0,
  },
  show: {
    y: ["5%", "0%", "0%", "-200%"],
    opacity: [0, 1, 1, 1],
    transition: {
      duration: motionVariables.speed.speedTwo,
      ease: "easeInOut",
      times: [0, 0.4, 0.7, 1],
      delay: motionVariables.speed.speedOne
    }
  }
}

const backgroundVariantMD = {
  hidden: {
    originY: 1,
    x: "-50%",
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: motionVariables.speed.speedOne,
      delay: motionVariables.speed.speedTwo,
      ease: "easeInOut",
    }
  },
}

const backgroundVariantSM = {
  hidden: {
    x: "-50%",
    y: 190,
    opacity: 0,
  },
  show: {
    y: [190, 190, 190, 0],
    opacity: [0, 0, 0, 1],
    transition: {
      duration: motionVariables.speed.speedThree,
      ease: "easeInOut",
      times: [0, 0.4, 0.7, 1],
    },
  },
}

const buttonVariant = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      duration: motionVariables.speed.speedOne,
      delay: motionVariables.speed.speedThree
    }
  }
}

const DarkRoom = () => {
  // context
  const {playClickSoundContext} = useSoundActionContext()
  const {changeCurrentPageContext} = useRouteActionContext()
  const isWindowSmall = UseWindowSmall()

  // state
  const [animateComplete, setAnimateComplete] = useState(false)

  // function
  const goToNextPage = () => {
    if (animateComplete) {
      changeCurrentPageContext('TurnOnLight')
    }
  }

  const completedAnimate = () => setAnimateComplete(true)

  const touchPanelSm = () => {
    if (isWindowSmall && animateComplete) {
      playClickSoundContext()
      goToNextPage()
    }
  }

  // function for rendering
  const renderBackground = () => {
    if (isWindowSmall) {
      return (
        <AnimatePresence>
          <motion.div
            className="dark-room__figure"
            variants={ backgroundVariantSM }
            initial="hidden"
            animate="show"
            onAnimationComplete={completedAnimate}
          >
            <img className="dark-room__image dark-room__image--sm" src={ bgSceneSM } alt="dark room background" />
          </motion.div>
        </AnimatePresence>
      )
    } else {
      return (
        <motion.div
          className="dark-room__figure"
          variants={backgroundVariantMD}
          initial="hidden"
          animate="show"
          onAnimationComplete={completedAnimate}
        >
          <img className="dark-room__image dark-room__image--md" src={ bgSceneMD } alt="dark room background" />
        </motion.div>
      )
    }
  }

  return (
    <>
      <Content>
        <div className="scene-panel dark-room" onClick={touchPanelSm}>
          {
            renderBackground()
          }
          <div className="dark-room__container">
            <motion.div
              className="dark-room__text text-story"
              variants={ isWindowSmall ? textVariantSM : textVariantMD}
              initial="hidden"
              animate="show"
            >
              คุณตื่นขึ้นมากลางดึก<br/>แล้วมีเเต่ความมืดสลัว
              {
                !isWindowSmall &&
                <motion.div
                  className="dark-room__button"
                  variants={buttonVariant}
                  initial="hidden"
                  animate="show"
                >
                  <ButtonNext onClick={goToNextPage} />
                </motion.div>
              }
            </motion.div>
          </div>
        </div>
      </Content>
    </>
  )
}

export default DarkRoom