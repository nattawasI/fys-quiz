import React, {useState} from 'react'
import {useRouteActionContext} from '../context/RouteContext'
import {motion, AnimatePresence} from 'framer-motion'
import {containerVariant} from '../variable/MotionVariant'
import UseWindowSmall from '../utilityhook/useWindowSmall'
import Content from '../layout/Content'
import ButtonSound from '../component/ButtonSound'
import ButtonNext from '../component/ButtonNext'
import Donut from '../image/page/evidence/img_donut.png'
import Candy from '../image/page/evidence/img_candy.png'
import Whiskey from '../image/page/evidence/img_whiskey.png'
import BubbleTea from '../image/page/evidence/img_bubbletea.png'
import Hamburger from '../image/page/evidence/img_hamburger.png'

// Motion Variants
const textVariant = {
  hidden: {
    opacity: 0,
    y: 120
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 1,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.35,
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
      ease: "easeInOut",
      duration: 0.5,
      delay: 1,
    }
  }
}

const evidenceVariant = {
  hidden: {
    opacity: 0,
    y: 160
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 1,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'tween',
    }
  }
}

const Investigate = () => {
  // route context
  const {changeCurrentPageContext} = useRouteActionContext()

  // utility hook
  const isWindowSmall = UseWindowSmall()

  // state
  const [showScene1, setShowScene1] = useState(true)
  const [showScene2, setShowScene2] = useState(false)
  const [showScene3, setShowScene3] = useState(false)

  const Evidences = [ Donut, Candy, Hamburger, BubbleTea, Whiskey ]

  // function
  const goToNextPage = () => {
    changeCurrentPageContext('VideoDoctor')
  }

  const changeToScene2 = () => {
    setShowScene1(false)
    setShowScene2(true)
  }

  const changeToScene3 = () => {
    setShowScene2(false)
    setShowScene3(true)
  }

  const touchPanelSm = () => {
    if (isWindowSmall) {
      if (showScene3) {
        goToNextPage()
      } else {
        if(showScene1) {
          changeToScene2()
        } else if (showScene2) {
          changeToScene3()
        }
      }
    }
  }

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <ButtonSound />
      <Content bgColor="white">
        <div className="scene-panel evidence" onClick={touchPanelSm}>
          <div className="evidence__container">
            <div className="evidence__content">
              <AnimatePresence exitBeforeEnter>
                {
                  showScene1 &&
                  <motion.p
                    key="evidence-text-01"
                    className="evidence__text text-story text-story--black"
                    variants={textVariant}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    สำหรับคดีนี้ฆาตกร ก็คือ<br/><b>เหล่าหลักฐานในที่เกิดเหตุ</b>
                  </motion.p>
                }
                {
                  showScene2 &&
                  <motion.div
                    key="evidence-text-02"
                    className="evidence__text text-story text-story--black"
                    variants={textVariant}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    คุณอาจสงสัยว่าทำไม?
                  </motion.div>
                }
                {
                  showScene3 &&
                  <motion.div
                    key="evidence-text-03"
                    className="evidence__text text-story text-story--black"
                    variants={textVariant}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    ผมจะให้หมอมาช่วยอธิบาย<br/>ให้เข้าใจมากขึ้นครับ
                  </motion.div>
                }
              </AnimatePresence>
            </div>
            <div className="evidence__list suspect">
              <motion.div
                className="suspect__list"
                variants={evidenceVariant}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {
                  Evidences.map((item, index) => (
                    <motion.div key={`suspect-key-${index}`} className="suspect__item">
                      <img className="suspect__image" src={item} alt={item} />
                    </motion.div>
                    )
                  )
                }
              </motion.div>
            </div>
            {
              !isWindowSmall &&
              <>
                {
                  showScene1 &&
                  <motion.div
                    className="evidence__button"
                    variants={buttonVariant}
                    initial="hidden"
                    animate="show"
                  >
                    <ButtonNext onClick={changeToScene2}/>
                  </motion.div>
                }
                {
                  showScene2 &&
                  <div className="evidence__button">
                    <ButtonNext onClick={changeToScene3}/>
                  </div>
                }
                {
                  showScene3 &&
                  <div className="evidence__button">
                    <ButtonNext onClick={goToNextPage}/>
                  </div>
                }
              </>
            }
            <div className="evidence__curve"></div>
          </div>
        </div>
      </Content>
    </motion.div>
  )
}

export default Investigate