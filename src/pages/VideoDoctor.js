import React from 'react'
import {useRouteActionContext} from '../contexts/RouteContext'
import {motion} from 'framer-motion'
import Content from '../layout/Content'
import ButtonNext from '../components/ButtonNext'

// Motion Variants
const buttonVariant = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.2
    }
  }
}

const VideoDoctor = () => {
  // context
  const {changeCurrentPageContext} = useRouteActionContext()

  // function
  const goToNextPage = () => {
    changeCurrentPageContext('CausesOfDiabetes')
  }

  return (
    <>
      <Content bgColor="blue">
        <div className="scene-panel scene-panel--items-center video-doctor">
          <div className="video-box">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/_wyIcYyP8EA?rel=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      </Content>
      <motion.div className="button-fixed-right-bottom"
        variants={buttonVariant}
        initial="hidden"
        animate="show"
      >
        <ButtonNext onClick={goToNextPage} />
      </motion.div>
    </>
  )
}

export default VideoDoctor
