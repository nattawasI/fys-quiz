import React from 'react'
import {useUserStateContext} from '../context/UserContext'
import {motion} from 'framer-motion'
import {MotionUtilities} from '../variable/MotionUtilities'
import UseCurrentDevice from '../utilityhook/useCurrentDevice'
import Content from '../layout/Content'
import ButtonSound from '../component/ButtonSound'
import ButtonRestart from '../component/ButtonRestart'
import Facebook from '../image/page/end/ico_facebook.svg'
import Line from '../image/page/end/ico_line.svg'
import Shared from '../image/page/end/ico_shared.svg'
import Twitter from '../image/page/end/ico_twitter.svg'
import RibbonTop from '../image/page/end/ico_ribbon_01.svg'
import RibbonBottom from '../image/page/end/ico_ribbon_02.svg'
import DeadbodyMaleMD from '../image/page/end/img_deadbody_male_md.svg'
import DeadbodyMaleTB from '../image/page/end/img_deadbody_male_tb.svg'
import DeadbodyMaleSM from '../image/page/end/img_deadbody_male_sm.svg'
import DeadbodyFemaleMD from '../image/page/end/img_deadbody_female_md.svg'
import DeadbodyFemaleTB from '../image/page/end/img_deadbody_female_md.svg'
import DeadbodyFemaleSM from '../image/page/end/img_deadbody_female_sm.svg'

const personVariant = {
  hidden: {
    opacity: MotionUtilities.opacity.opacityZero,
  },
  show: {
    opacity: MotionUtilities.opacity.opacityOne,
    transition: {
      duration: MotionUtilities.speed.speedOne,
      delay: MotionUtilities.speed.speedOne,
      ease: 'easeInOut',
    }
  },
}

const socialVariant = {
  hidden: {
    opacity: MotionUtilities.opacity.opacityZero,
  },
  show: {
    opacity: MotionUtilities.opacity.opacityOne,
    transition: {
      delay: MotionUtilities.speed.speedOne,
      duration: MotionUtilities.speed.speedOne,
      ease: 'easeInOut',
    }
  },
}

const RibbonTopVariant = {
  hidden: {
    y: -150,
    opacity: MotionUtilities.opacity.opacityZero,
  },
  show: {
    y: 0,
    opacity: MotionUtilities.opacity.opacityOne,
    transition: {
      delay: MotionUtilities.speed.speedOne,
      duration: MotionUtilities.speed.speedOne,
      ease: 'easeInOut',
    }
  },
}

const RibbonBottomVariant = {
  hidden: {
    y: 150,
    opacity: MotionUtilities.opacity.opacityZero,
  },
  show: {
    y: 0,
    opacity: MotionUtilities.opacity.opacityOne,
    transition: {
      duration: MotionUtilities.speed.speedOne,
      delay: MotionUtilities.speed.speedOne,
      ease: 'easeInOut',
    }
  },
}

const End = () => {
  // context
  const {friendInfoContext} = useUserStateContext()

  // utility hook
  const currentDevice = UseCurrentDevice()

  // function
  const goToNextPage = () => {
    window.location.reload()
  }

  const Socials = [
    {
      icon: Shared,
      name: 'Shared',
    },
    {
      icon: Facebook,
      name: 'Facebook',
    },
    {
      icon: Twitter,
      name: 'Twitter',
    },
    {
      icon: Line,
      name: 'Line',
    }
  ]

  friendInfoContext.gender = 'male'

  const setImageHuman = () => {
    if (currentDevice === 'desktop') {
      return friendInfoContext.gender === 'male'? DeadbodyMaleMD: DeadbodyFemaleMD
    } else if (currentDevice === 'tablet') {
      return friendInfoContext.gender === 'male'? DeadbodyMaleTB: DeadbodyFemaleTB
    } else {
      return friendInfoContext.gender === 'male'? DeadbodyMaleSM: DeadbodyFemaleSM
    }
  }

  return (
    <>
      <div className="button-fixed-left-top">
        <ButtonRestart onClick={goToNextPage} />
      </div>
      <ButtonSound />
      <Content>
        <div className="scene-panel end">
          <div className="end__container">
            <div className="end__content">
              <motion.img
                className="end__ribbon-top"
                src={ RibbonTop }
                alt="ribbon top"
                variants={RibbonTopVariant}
                initial="hidden"
                animate="show"
              />

              <motion.img
                className="end__ribbon-bottom"
                src={ RibbonBottom }
                alt="ribbon bottom"
                variants={RibbonBottomVariant}
                initial="hidden"
                animate="show"
              />

              <motion.div
                className="end__person"
                variants={personVariant}
                initial="hidden"
                animate="show"
              >
                <div className="end__body dead-body">
                  <img
                    className="dead-body__image"
                    src={ setImageHuman() }
                    alt="dead body"
                  />
                </div>
              </motion.div>
              <div className="end__social social">
                <motion.div
                  className="social__list"
                  variants={socialVariant}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {
                    Socials.map((item, index) => (
                      <motion.div
                        key={`social-key-${index}`}
                        className="social__item"
                        whileHover={{ scale: 1.2 }}
                      >
                        <a className="social__link" href="#dummy">
                          <img className="social__icon" src={item.icon} alt={item.name} />
                        </a>
                      </motion.div>
                    ))
                  }
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

export default End