
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {motion, AnimatePresence} from 'framer-motion'
import {containerVariant} from '../variable/MotionVariant'
import {useUserStateContext} from '../context/UserContext'
import UseWindowSmall from '../utilityhook/useWindowSmall'
import Content from '../layout/Content'
import ButtonSound from '../component/ButtonSound'
import ButtonNext from '../component/ButtonNext'

// motion Variant
const textVariant = {
  hidden: {
    opacity: 0,
    y: 70
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      delay: 0.5,
      duration: 0.9
    },
  },
  exit: {
    y: -100,
    opacity: 0,
    transition: {
      type: 'tween',
    }
  }
}

const buttonVariant = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      delay: 1,
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'tween',
    }
  }
}

const CallPolice = () => {
  const { friendInfoContext } = useUserStateContext()
  const isWindowSmall = UseWindowSmall()
  const [showScene1, setShowScene1] = useState(true)
  const [showScene2, setShowScene2] = useState(false)
  const [showScene3, setShowScene3] = useState(false)

  let nextScene = ''

  const changeToScene2 = () => {
    setShowScene1(false)
    setShowScene2(true)
  }

  const changeToScene3 = () => {
    setShowScene2(false)
    setShowScene3(true)
  }

  const skipScene = () => {
    if (isWindowSmall) {
      if (nextScene === 'scene2') {
        setShowScene1(false)
        setShowScene2(true)
      } else if (nextScene === 'scene3') {
        setShowScene1(false)
        setShowScene2(false)
        setShowScene3(true)
      }
    }
  }

  return (
    <>
      <ButtonSound />
      <Content>
        <motion.div className="scene-panel call-police" onClick={skipScene}
          variants={containerVariant}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <div className="box-story call-police__scene call-police__scene--1">
            <AnimatePresence>
              {
                showScene1
                && <motion.p className="box-story__text text-story"
                  key="textScene1"
                  variants={textVariant}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  onAnimationComplete={ () => nextScene = 'scene2' }
                >แต่กลับพบว่า<br />{friendInfoContext.name} ตัวเย็นเฉียบ<br />หน้าซีด และไม่หายใจ</motion.p>
              }
              {
                !isWindowSmall && showScene1
                && <motion.div className="box-story__button"
                    key="buttonNextScene1"
                    variants={buttonVariant}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <ButtonNext onClick={changeToScene2} />
                  </motion.div>
              }
            </AnimatePresence>
          </div>
          <div className="box-story call-police__scene call-police__scene--2">
            <AnimatePresence>
              {
                showScene2
                && <motion.p className="box-story__text text-story"
                  key="textScene2"
                  variants={textVariant}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  onAnimationComplete={ () => nextScene = 'scene3' }
                >{friendInfoContext.name}<br />"เสียชีวิต"</motion.p>
              }
              {
                !isWindowSmall && showScene2
                && <motion.div className="box-story__button"
                    key="buttonNextScene2"
                    variants={buttonVariant}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <ButtonNext onClick={changeToScene3} />
                  </motion.div>
              }
            </AnimatePresence>
          </div>
          <div className="box-story call-police__scene call-police__scene--3">
            {
              showScene3
              && <motion.p
                  className="box-story__text text-story"
                  variants={textVariant}
                  initial="hidden"
                  animate="show"
                >
                  คุณตกใจมาก โวยวายเสียงดัง!<br />แล้วรีบหยิบมือถือ โทรแจ้งตำรวจทันที
                </motion.p>
            }
            {
              showScene3
              &&  <motion.div className="box-story__button"
                    variants={buttonVariant}
                    initial="hidden"
                    animate="show"
                  >
                    <Link to="/police-came" className="button-call">
                      <span className="button-call__btn button-call__btn--wave-out" alt="Call Button"></span>
                      <span className="button-call__btn button-call__btn--wave-in"></span>
                      <span className="button-call__btn button-call__btn--body"></span>
                      <span className="button-call__btn button-call__btn--touch"></span>
                    </Link>
                  </motion.div>
            }
          </div>
        </motion.div>
      </Content>
    </>
  )
}

export default CallPolice

