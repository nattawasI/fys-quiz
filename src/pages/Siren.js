import React from 'react'
import {motion} from 'framer-motion'
import UseWindowSmall from '../utilityhooks/useWindowSmall'
import Content from '../layouts/Content'
import ButtonSound from '../components/ButtonSound'
import ButtonNext from '../components/ButtonNext'

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

const bgVariant = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
      delay: 0.5,
      duration: 2
    }
  }
}

const textVariant = {
  hidden: {
    opacity: 0,
    y: 50
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      delay: 0.5,
      duration: 1
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
      delay: 1.5,
      duration: 1
    }
  }
}

const Siren = () => {
  const isWindowSmall = UseWindowSmall()

  return (
    <>
      <ButtonSound />
      <Content>
        <motion.div className="scene-panel siren"
          variants={containerVariant}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <motion.div className="siren__background"
            variants={bgVariant}
            initial="hidden"
            animate="show"
          ></motion.div>
          <div className="siren__content box-story">
            <motion.p className="box-story__text text-story"
            variants={textVariant}
            initial="hidden"
            animate="show"
            >ตอนนี้ คุณตกเป็นผู้ต้องสงสัย<br />ในคดีการตายของเพื่อนสนิท</motion.p>
            {
              !isWindowSmall
              && <motion.div className="box-story__button"
                  variants={buttonVariant}
                  initial="hidden"
                  animate="show"
                >
                  <ButtonNext />
                </motion.div>
            }
          </div>
        </motion.div>
      </Content>
    </>
  )
}

export default Siren
