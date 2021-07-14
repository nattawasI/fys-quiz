import React from 'react'
import {useHistory} from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import UseWindowSmall from '../utilityhook/useWindowSmall'
import Content from '../layout/Content'
import ButtonSound from '../component/ButtonSound'
import ButtonNext from '../component/ButtonNext'
import bgSceneMD from '../image/page/darkroom/bg_scene_01_md.svg'
import bgSceneSM from '../image/page/darkroom/bg_scene_01_sm.svg'

// Motion Variants
const sceneVariantMD = {
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
      delay: 1.5,
      duration: 1.5,
      ease: "easeInOut",
    }
  },
}
const sceneVariantSM = {
  hidden: {
    x: "-50%",
    opacity: 0,
  },
  show: {
    y: [196, 196, 196, 38],
    opacity: [0, 0, 0, 1],
    transition: {
      duration: 3,
      ease: "easeInOut",
      times: [0, 0.4, 0.7, 1]
    },
  },
}

const textVariantMD = {
  hidden: {
    y: 0,
    opacity: 0,
  },
  show: {
    y: [0, 0, -300],
    opacity: [0, 1, 1],
    transition: {
      duration: 3,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  },
}

const textVariantSM = {
  hidden: {
    y: 25,
    opacity: 0,
  },
  show: {
    y: [25, 0, 0, -196],
    opacity: [0, 1, 1, 1],
    transition: {
      duration: 3,
      ease: "easeInOut",
      times: [0, 0.4, 0.7, 1]
    }
  }
}

const buttonVariant = {
  hidden: {
    y: 60,
    opacity: 0
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 3,
      duration: 1,
    }
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 1
    }
  }
}

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 1
    }
  },
  exit: {
    x: '-100vw',
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 1
    }
  }
}

const DarkRoom = () => {
  const isWindowSmall = UseWindowSmall()
  const history = useHistory()
  let allowLinkToNext = false

  const linkToNextPage = () => {
    if (isWindowSmall && allowLinkToNext) {
      history.push('/open-switch')
    }
  }

  return (
    <>
      <ButtonSound />
      <Content>
        <motion.div className="scene-panel dark-room" onClick={linkToNextPage}
          variants={containerVariant}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {
            isWindowSmall
            ? <motion.div
              key="darkroom-figure-02"
              className="dark-room__figure"
              initial="hidden"
              animate="show"
              variants={sceneVariantSM}
              onAnimationComplete={ () => allowLinkToNext = true }
            >
              <img className="dark-room__image dark-room__image--sm" src={bgSceneSM} alt="" />
            </motion.div>
            : <motion.div
              key="darkroom-figure-01"
              className="dark-room__figure"
              variants={sceneVariantMD}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <img className="dark-room__image dark-room__image--md" src={bgSceneMD} alt="" />
            </motion.div>
          }
          <div key="darkroom-02" className="dark-room__container">
            {
              isWindowSmall
              ? <motion.div
                  key="darkroom-text-02"
                  className="dark-room__text text-story"
                  initial="hidden"
                  animate="show"
                  variants={textVariantSM}
                >
                  คุณตื่นขึ้นมากลางดึก<br/>แล้วมีเเต่ความมืดสลัว
                </motion.div>
              : <div>
                  <motion.div
                    key="darkroom-text-01"
                    className="dark-room__text text-story"
                    variants={textVariantMD}
                    initial="hidden"
                    animate="show"
                  >
                    คุณตื่นขึ้นมากลางดึก<br/>แล้วมีเเต่ความมืดสลัว
                    <AnimatePresence>
                      <motion.div
                        className="dark-room__button"
                        variants={buttonVariant}
                        initial="hidden"
                        animate="show"
                      >
                        <ButtonNext to="/open-switch" />
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>
            }
          </div>
        </motion.div>
      </Content>
    </>
  )
}

export default DarkRoom
