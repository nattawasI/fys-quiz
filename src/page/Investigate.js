import React, {useState} from 'react'
import {useRouteActionContext} from '../context/RouteContext'
import {motion, AnimatePresence, useAnimation} from 'framer-motion'
import {containerVariant} from '../variable/MotionVariant'
import UseWindowSmall from '../utilityhook/useWindowSmall'
import Content from '../layout/Content'
import ButtonSound from '../component/ButtonSound'
import ButtonNext from '../component/ButtonNext'
import FormYourName from '../component/FormYourName'
import FormYear from '../component/FormYear'
import ImgPoliceMd from '../image/page/investigate/img_police_md.svg'
import ImgPoliceSm from '../image/page/investigate/img_police_sm.svg'
import ImgPhotoMd from '../image/page/investigate/img_photo_md.svg'
import ImgPhotoSm from '../image/page/investigate/img_photo_sm.svg'

// Motion Variants
const panelVariant = {
  initial: {
    y: 0,
    transition: {
      type: 'tween',
      ease: "easeInOut",
      duration: 0.7,
    }
  },
  end: {
    y: '-22%',
    transition: {
      type: 'tween',
      ease: "easeInOut",
      duration: 0.7,
    }
  },
}

const textVariant = {
  hidden: {
    opacity: 0,
    y: 70
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.7,
    }
  },
}

const buttonVariant = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.7,
      delay: 1,
    }
  }
}

const contentVariant = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.7
    }
  }
}

const Investigate = () => {
  // route context
  const {changeCurrentPageContext} = useRouteActionContext()

  // utility hook
  const isWindowSmall = UseWindowSmall()

  // useAnimation Motion
  const panelControl = useAnimation()

  // state
  // const [skipAnimate, setSkipAnimate] = useState(false)
  // const [animateComplete, setAnimateComplete] = useState(false)
  const [animateTable, setAnimateTable] = useState(false)
  const [scene, setScene] = useState('')

  // function
  const goToNextPage = () => {
    changeCurrentPageContext('PageName')
  }

  const touchPanelSm = () => {
    if (isWindowSmall) {
      // if (animateComplete) {
      //   goToNextPage()
      // } else {
      //   if (!skipAnimate) {
      //     setAnimateComplete(true)
      //     setSkipAnimate(true)
      //   }
      // }
    }
  }

  const toggleAnimateTable = () => {
    if (animateTable) {
      panelControl.start('initial')
      setAnimateTable(false)
    } else {
      panelControl.start('end')
      setAnimateTable(true)
    }
  }

  const toggleA = () => {
    if (scene === 'a') {
      setScene('')
    } else {
      setScene('a')
    }
  }

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <ButtonSound onClick={toggleA} />
      <Content>
        <motion.div className="investigate" onClick={touchPanelSm}
          variants={panelVariant}
          initial="hidden"
          animate={panelControl}
        >
          <div className="investigate__police">
            <img src={isWindowSmall ? ImgPoliceSm: ImgPoliceMd} alt="ตำรวจ" />
          </div>
          <div className="investigate__space">
            <div className="investigate__photo">
              <img src={isWindowSmall ? ImgPhotoSm: ImgPhotoMd} alt="รูปถ่าย" />
            </div>
            <div className="investigate__content">
              {/* <FormYourName /> */}
              {/* <div className="box-story">
                <motion.p className="box-story__text text-story"
                  variants={textVariant}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  // onAnimationComplete={ () => nextScene = 'scene2' }
                >ตอนนี้เรากำลังสงสัยว่านี่คือ<br /><span className="text-story--bigger">"คดีฆาตกรรม"</span></motion.p>
                {
                  !isWindowSmall
                  && <motion.div className="box-story__button"
                      key="buttonNextScene1"
                      variants={buttonVariant}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      <ButtonNext />
                    </motion.div>
                }
              </div> */}
              {/* <div className="box-story">
                <motion.p className="box-story__text text-story"
                  variants={textVariant}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  // onAnimationComplete={ () => nextScene = 'scene3' }
                >ขอความร่วมมือ คุณบรอน<br />ในการให้ปากคำด้วยนะครับ</motion.p>
                {
                  !isWindowSmall
                  && <motion.div className="box-story__button"
                      key="buttonNextScene1"
                      variants={buttonVariant}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      <ButtonNext />
                    </motion.div>
                }
              </div> */}
              {/* <div className="box-story">
                <motion.p className="box-story__text text-story"
                  variants={textVariant}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  // onAnimationComplete={ () => nextScene = 'scene3' }
                >ขอบคุณในการให้ปากคำ</motion.p>
                {
                  !isWindowSmall
                  && <motion.div className="box-story__button"
                      key="buttonNextScene1"
                      variants={buttonVariant}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      <ButtonNext />
                    </motion.div>
                }
              </div> */}
              <AnimatePresence>
                {
                  scene === 'a'
                  && <motion.div
                        variants={contentVariant}
                        exit="exit"
                      >
                        <div className="box-story">
                          <motion.p className="box-story__text text-story"
                            variants={textVariant}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            // onAnimationComplete={ () => nextScene = 'scene3' }
                          >ตอนนี้เราได้ทราบ<br className="sm-show" />สาเหตุการเสียชีวิตแล้ว</motion.p>
                          {
                            !isWindowSmall
                            && <motion.div className="box-story__button"
                                key="buttonNextScene1"
                                variants={buttonVariant}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                              >
                                <ButtonNext />
                              </motion.div>
                          }
                        </div>
                      </motion.div>
                }
              </AnimatePresence>
              {/* <AnimatePresence>
                {
                  <FormYear />
                }
              </AnimatePresence> */}
            </div>
          </div>
        </motion.div>
      </Content>
    </motion.div>
  )
}

export default Investigate
