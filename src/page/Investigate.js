import React, {useState, useEffect} from 'react'
import {useRouteActionContext} from '../context/RouteContext'
import {motion, AnimatePresence, useAnimation} from 'framer-motion'
import {containerVariant} from '../variable/MotionVariant'
import UseWindowSmall from '../utilityhook/useWindowSmall'
import Content from '../layout/Content'
import ButtonSound from '../component/ButtonSound'
import ButtonBack from '../component/ButtonBack'
import ButtonNext from '../component/ButtonNext'
import FormYourName from '../component/FormYourName'
import ListCardActivity from '../component/ListCardActivity'
import FormYear from '../component/FormYear'
import ImgPoliceMd from '../image/page/investigate/img_police_md.svg'
import ImgPoliceSm from '../image/page/investigate/img_police_sm.svg'
import ImgPhotoMd from '../image/page/investigate/img_photo_md.svg'
import ImgPhotoSm from '../image/page/investigate/img_photo_sm.svg'

// Motion Variants
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

const photoVariant = {
  exit: {
    opacity: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.7,
      delay: 1,
    }
  }
}

const contentVariant = {
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
  },
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
      y: isWindowSmall ? '-30%': '-22%',
      transition: {
        type: 'tween',
        ease: "easeInOut",
        duration: 0.7,
      }
    },
  }

  // useAnimation Motion
  const panelControl = useAnimation()

  // state
  // const [skipAnimate, setSkipAnimate] = useState(false)
  // const [animateComplete, setAnimateComplete] = useState(false)
  const [animateTable, setAnimateTable] = useState(true)
  const [showPhoto, setShowPhoto] = useState(false)
  const [sceneYourName, setSceneYourName] = useState(false)
  const [sceneMurder, setSceneMurder] = useState(false)
  const [sceneAskCooperation, setSceneAskCooperation] = useState(false)
  const [sceneActivityOften, setSceneActivityOften] = useState(true)
  const [sceneQuiz, setSceneQuiz] = useState(false)
  const [sceneFormYear, setSceneFormYear] = useState(false)
  const [sceneActivityToday, setSceneActivityToday] = useState(false)
  const [sceneThankYou, setSceneThankYou] = useState(false)
  const [sceneCause, setSceneCause] = useState(false)

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
      setShowPhoto(true)
      // panelControl.start('initial')
      // setAnimateTable(false)
    } else {
      setShowPhoto(false)
      // panelControl.start('end')
      // setAnimateTable(true)
    }
  }

  useEffect(() => {
    toggleAnimateTable()
  }, [])

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <ButtonBack />
      <ButtonSound onClick={toggleAnimateTable} />
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
            {
              showPhoto
              && <div className="investigate__photo">
                  <img src={isWindowSmall ? ImgPhotoSm: ImgPhotoMd} alt="รูปถ่าย" />
                </div>
            }
            <div className="investigate__content">
              <AnimatePresence>
                {
                  sceneYourName
                  && <motion.div
                      key="scene-your-name"
                      variants={contentVariant}
                      exit="exit"
                    >
                      <FormYourName />
                    </motion.div>
                }
                {
                  sceneMurder
                  && <motion.div
                      key="scene-murdur"
                      variants={contentVariant}
                      exit="exit"
                    >
                      <div className="box-story">
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
                      </div>
                    </motion.div>
                }
                {
                  sceneAskCooperation
                  && <motion.div
                      key="scene-thank-you"
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
                      </div>
                    </motion.div>
                }
                {
                  sceneActivityOften
                  && <motion.div
                      className="form-activity"
                      key="scene-activity-often"
                      variants={contentVariant}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      <div className="text-story form-activity__title">เริ่มจากก่อนเกิดเหตุ กิจกรรมระหว่างคุณ<br />กับคุณ ปิยะบุตร ที่ทำบ่อย ๆ คืออะไร? </div>
                      <div className="form-activity__list">
                        <ListCardActivity />
                      </div>
                    </motion.div>
                }
                {
                  sceneQuiz
                  && <motion.div
                      key="scene-quiz"
                      variants={contentVariant}
                      exit="exit"
                    >
                      Quiz
                    </motion.div>
                }
                {
                  sceneFormYear
                  && <motion.div
                      key="scene-year"
                      variants={contentVariant}
                      exit="exit"
                    >
                      <FormYear />
                    </motion.div>
                }
                {
                  sceneActivityToday
                  && <motion.div
                      className="form-activity"
                      key="scene-activity-today"
                      variants={contentVariant}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      <div className="text-story form-activity__title">กิจกรรมสุดท้ายที่รู้สึกว่า<br />ได้ทำร่วมกับเพื่อนสนิท ในวันเกิดเหตุ?</div>
                      <div className="form-activity__list">
                        <ListCardActivity />
                      </div>
                    </motion.div>
                }
                {
                  sceneThankYou
                  && <motion.div
                      key="scene-thank-you"
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
                    </div>
                  </motion.div>
                }
                {
                  sceneCause
                  && <motion.div
                        key="scene-cause"
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
            </div>
          </div>
        </motion.div>
      </Content>
    </motion.div>
  )
}

export default Investigate
