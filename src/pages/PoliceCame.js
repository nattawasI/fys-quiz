import React from 'react'
import {useHistory} from 'react-router-dom'
import {motion} from 'framer-motion'
import UseWindowSmall from '../utilityhooks/useWindowSmall'
import Content from '../layouts/Content'
import ButtonSound from '../components/ButtonSound'
import ButtonNext from '../components/ButtonNext'
import BgDeadManMd from '../image/pages/police-came/bg_deadman_md.svg'
import BgDeadManSm from '../image/pages/police-came/bg_deadman_sm.svg'

// Motion Variants
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
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 1
    }
  }
}

const bodyVariant = {
  hidden: {
    y: 70,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      delay: 1,
    }
  }
}

const textVariant = {
  hidden: {
    y: 70,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
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
      duration: 0.5,
      delay: 1.5,
    }
  }
}

const PoliceCame = () => {
  const isWindowSmall = UseWindowSmall()
  const history = useHistory()

  const linkToNextPage = () => {
    if (isWindowSmall) {
      history.push('/siren')
    }
  }

  return (
    <>
      <ButtonSound />
      <Content>
        <motion.div className="scene-panel police-came" onClick={linkToNextPage}
          variants={containerVariant}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <motion.div className="police-came__body"
            variants={bodyVariant}
            initial="hidden"
            animate="show"
          >
            <img src={isWindowSmall ? BgDeadManSm : BgDeadManMd} className="police-came__body-img" alt="ศพเพื่อนนอนตาย" />
          </motion.div>
          <div className="police-came__content box-story">
            <motion.p className="box-story__text text-story"
              variants={textVariant}
              initial="hidden"
              animate="show"
            >เมื่อตำรวจมาถึง ก็สำรวจที่เกิดเหตุทันที<br />แล้วขอเชิญคุณไปสอบสวน</motion.p>
            {
              !isWindowSmall
              && <motion.div className="box-story__button"
                  variants={buttonVariant}
                  initial="hidden"
                  animate="show"
                >
                  <ButtonNext to="/siren" />
                </motion.div>
            }
          </div>
        </motion.div>
      </Content>
    </>
  )
}

export default PoliceCame
