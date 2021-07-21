import React from 'react'
import {useRouteStateContext} from '../context/RouteContext'
// import {AnimatePresence} from 'framer-motion'
import Start from './Start'
import Preface from './Preface'
import DarkRoom from './DarkRoom'
import TurnOnLight from './TurnOnLight'
import FriendSleep from './FriendSleep'
import WakeFriendUp from './WakeFriendUp'
import CallPolice from './CallPolice'
import PoliceCame from './PoliceCame'
import Siren from './Siren'
import Investigate from './Investigate'
import DeadBody from './DeadBody'
import Murder from './Murder'
import Evidence from './Evidence'
import VideoDoctor from './VideoDoctor'
import CausesOfDiabetes from './CausesOfDiabetes'
import Summary from './Summary'
import ResultSymptoms from './ResultSymptoms'
import Suggestion from './Suggestion'
import End from './End'

const Index = () => {
  const {currentPageContext} = useRouteStateContext()

  const renderPage = () => {
    if (currentPageContext === 'Start') {
      return <Start />
    } else if (currentPageContext === 'Preface') {
      return <Preface />
    } else if (currentPageContext === 'DarkRoom') {
      return <DarkRoom />
    } else if (currentPageContext === 'TurnOnLight') {
      return <TurnOnLight />
    } else if (currentPageContext === 'FriendSleep') {
      return <FriendSleep />
    } else if (currentPageContext === 'WakeFriendUp') {
      return <WakeFriendUp />
    } else if (currentPageContext === 'CallPolice') {
      return <CallPolice />
    } else if (currentPageContext === 'PoliceCame') {
      return <PoliceCame />
    } else if (currentPageContext === 'Siren') {
      return <Siren />
    } else if (currentPageContext === 'Investigate') {
      return <Investigate />
    } else if (currentPageContext === 'DeadBody') {
      return <DeadBody />
    } else if (currentPageContext === 'Murder') {
      return <Murder />
    } else if (currentPageContext === 'Evidence') {
      return <Evidence />
    } else if (currentPageContext === 'VideoDoctor') {
      return <VideoDoctor />
    } else if (currentPageContext === 'CausesOfDiabetes') {
      return <CausesOfDiabetes />
    } else if (currentPageContext === 'Summary') {
      return <Summary />
    } else if (currentPageContext === 'ResultSymptoms') {
      return <ResultSymptoms />
    } else if (currentPageContext === 'Suggestion') {
      return <Suggestion />
    } else if (currentPageContext === 'End') {
      return <End />
    }
  }

  return (
    <div className="page-content">
      {
        renderPage()
      }
    </div>
  )
}

export default Index
