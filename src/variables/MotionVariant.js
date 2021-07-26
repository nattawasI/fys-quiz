// motion variant
export const containerVariant = {
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

export const motionVariables = {
  speed: {
    speedOne: 1,
    speedTwo: 2,
    speedThree: 3,
    speedFour: 4,
  },
  opacity: {
    opacityZero: 0,
    opacityOne: 1,
  }
}