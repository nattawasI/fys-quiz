import React from 'react'
import {useRouteActionContext} from '../context/RouteContext'
import {motion} from 'framer-motion'
import {containerVariant} from '../variable/MotionVariant'
import UseWindowSmall from '../utilityhook/useWindowSmall'
import Content from '../layout/Content'
import ButtonSound from '../component/ButtonSound'
import ButtonNext from '../component/ButtonNext'
import VideoDoctorMp4 from '../image/page/video-doctor/doctor.mp4'
import ImgPosterDoctor from '../image/page/video-doctor/img_poster_doctor.svg'

// Motion Variants
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

const VideoDoctor = () => {
  // route context
  const {changeCurrentPageContext} = useRouteActionContext()

  // utility hook
  const isWindowSmall = UseWindowSmall()

  // function
  const goToNextPage = () => {
    changeCurrentPageContext('CausesOfDiabetes')
  }

  const touchPanelSm = () => {
    goToNextPage()
  }

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <ButtonSound />
      <Content bgColor="blue">
        <div className="scene-panel video-doctor" onClick={touchPanelSm}>
          <div className="video-box">
            <video controls poster={ImgPosterDoctor}>
              <source src={VideoDoctorMp4} type="video/mp4" />
            </video>
          </div>
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

export default VideoDoctor