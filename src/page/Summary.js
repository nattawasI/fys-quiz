import React, {useState, useEffect} from 'react'
import {useRouteActionContext} from '../context/RouteContext'
import {useUserStateContext} from '../context/UserContext'
import {motion} from 'framer-motion'
import {containerVariant} from '../variable/MotionVariant'
import UseWindowSmall from '../utilityhook/useWindowSmall'
import Content from '../layout/Content'
import ButtonSound from '../component/ButtonSound'
import ButtonNext from '../component/ButtonNext'
import ImgNoteMd from '../image/page/summary/img_note_md.svg'
import ImgNoteSm from '../image/page/summary/img_note_sm.svg'
import ImgRisk100Md from '../image/page/summary/img_risk_100_md.svg'
import ImgRisk50Md from '../image/page/summary/img_risk_50_md.svg'
import ImgRisk0Md from '../image/page/summary/img_risk_0_md.svg'
import ImgRisk100Sm from '../image/page/summary/img_risk_100_sm.svg'
import ImgRisk50Sm from '../image/page/summary/img_risk_50_sm.svg'
import ImgRisk0Sm from '../image/page/summary/img_risk_0_sm.svg'

// Motion Variants
const textVariant = {
  hidden: {
    opacity: 0,
    y: -90
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: "easeInOut",
      duration: 1,
      delay: 1,
    }
  }
}

const paperMdVariant = {
  hidden: {
    opacity: 0,
    y: -90
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: "easeInOut",
      duration: 1,
      delay: 1,
    }
  }
}

const noteVariant = {
  hidden: {
    opacity: 0,
    y: 90
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: "easeInOut",
      duration: 1,
      delay: 1,
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
      duration: 0.7,
      delay: 1.5,
    }
  }
}

const Summary = () => {
  // route context
  const {changeCurrentPageContext} = useRouteActionContext()
  const {activityOftenContext, choicesContext} = useUserStateContext()

  // utility hook
  const isWindowSmall = UseWindowSmall()

  // state
  const [animateComplete, setAnimateComplete] = useState(false)
  const [paperSmRender, setPaperSmRender] = useState(false)
  const [sumScore, setSumScore] = useState(0)

  // function
  const goToNextPage = () => {
    changeCurrentPageContext('ResultSymptoms')
  }

  const touchPanelSm = () => {
    if (isWindowSmall && animateComplete) {
      goToNextPage()
    }
  }

  const renderActivityOften = () => {
    if (activityOftenContext === 'game') {
      return 'เล่นเกม'
    } else if (activityOftenContext === 'food') {
      return 'กิน'
    } else if (activityOftenContext === 'exercise') {
      return 'ออกกำลังกาย'
    }
  }

  const renderImgPaperSm = () => {
    if (sumScore >= 4) {
      return <img src={ImgRisk100Sm} alt={ 'คุณเองก็มีความเสี่ยง "โรคเบาหวาน" เพราะพฤติกรรมของคุณคล้ายกับเพื่อนสนิท'} />
    } else if (sumScore === 2 || sumScore === 3) {
      return <img src={ImgRisk50Sm} alt={ 'คุณเองมีความเสี่ยงเป็น "โรคเบาหวาน" เล็กน้อย แต่เพื่อนของคุณเสียชีวิตจาก "โรคเบาหวาน" เพราะสาเหตุจำเพาะที่อาจเกิดจากพันธุกรรม'} />
    } else {
      return <img src={ImgRisk0Sm} alt={ 'คุณไม่เสี่ยงเป็น "โรคเบาหวาน" แต่เพื่อนของคุณเสียชีวิตจาก "โรคเบาหวาน" เพราะสาเหตุจำเพาะที่อาจเกิดจากพันธุกรรม'} />
    }
  }

  const renderImgPaperMd = () => {
    if (sumScore >= 4) {
      return <img src={ImgRisk100Md} alt={ 'คุณเองก็มีความเสี่ยง "โรคเบาหวาน" เพราะพฤติกรรมของคุณคล้ายกับเพื่อนสนิท'} />
    } else if (sumScore === 2 || sumScore === 3) {
      return <img src={ImgRisk50Md} alt={ 'คุณเองมีความเสี่ยงเป็น "โรคเบาหวาน" เล็กน้อย แต่เพื่อนของคุณเสียชีวิตจาก "โรคเบาหวาน" เพราะสาเหตุจำเพาะที่อาจเกิดจากพันธุกรรม'} />
    } else {
      return <img src={ImgRisk0Md} alt={ 'คุณไม่เสี่ยงเป็น "โรคเบาหวาน" แต่เพื่อนของคุณเสียชีวิตจาก "โรคเบาหวาน" เพราะสาเหตุจำเพาะที่อาจเกิดจากพันธุกรรม'} />
    }
  }

  useEffect(() => {
    if (isWindowSmall) {
      setTimeout(() => {
        setPaperSmRender(true)
      }, 1700);
    }
  }, [isWindowSmall, paperSmRender])

  useEffect(() => {
    const calculateSummary = () => {
      let score = 0
      for(const choice of choicesContext) {
        score = score + choice.score
      }

      setSumScore(score)
    }

    calculateSummary()
  }, [choicesContext])

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <ButtonSound />
      <Content bgColor="blue">
        <div className="scene-panel summary" onClick={touchPanelSm}>
          <motion.div className="summary__content"
            variants={textVariant}
            initial="hidden"
            animate="show"
            onAnimationComplete={ () => setAnimateComplete(true) }
          >
            <div className="text-summary">
              <div className="text-summary__title">สรุปจากการให้ปากคำของคุณ</div>
              <ul className="text-summary__list list-summary">
                <li className="list-summary__item">
                  {
                    renderActivityOften()
                  }
                </li>
                {
                  choicesContext.length
                  // eslint-disable-next-line array-callback-return
                  ? choicesContext.map((choice, index) => {
                      return <li className="list-summary__item" key={'bullet' + (index + 1)}>{choice.label}</li>
                    })
                  : ''
                }
              </ul>
            </div>
          </motion.div>
          {
            isWindowSmall
            ? <div className={`summary__paper${paperSmRender? ' animate': ''}`}>
                {
                  renderImgPaperSm()
                }
              </div>
            : <motion.div className="summary__paper"
                initial="hidden"
                animate="show"
                variants={paperMdVariant}
              >
                {
                  renderImgPaperMd()
                }
              </motion.div>
          }
          <motion.div className="summary__note"
            variants={noteVariant}
            initial="hidden"
            animate="show"
          >
            <img src={isWindowSmall? ImgNoteSm: ImgNoteMd} alt="" />
          </motion.div>
        </div>
      </Content>
      {
        !isWindowSmall
        && <motion.div className="button-fixed-right-bottom"
            variants={buttonVariant}
            initial="hidden"
            animate="show"
          >
            <ButtonNext onClick={goToNextPage} />
          </motion.div>
      }
    </motion.div>
  )
}

export default Summary
