import React, {useState, createContext, useContext, useEffect} from 'react'
import axios from "axios";
import dayjs from "dayjs";

const DashboardStateContext = createContext()
const DashboardActionContext = createContext()

export const useDashboardStateContext = () => {
  return useContext(DashboardStateContext)
}

export const useDashboardActionContext = () => {
  return useContext(DashboardActionContext)
}

const DashboardProvider = ({ children }) => {
  // state
  const [isLoggedInContext, setIsLoggedInContext] = useState(false)
  const [isLoadingContext, setIsLoadingContext] = useState(true)
  const [summaryDataContext, setSummaryDataContext] = useState({})
  const [linkExportContext, setLinkExportContext] = useState('')

  // function
  const loggedInContext = () => { // handle login
    setIsLoggedInContext(true)
  }

  const fetchSummary = (startDate, endDate) => {
    setIsLoadingContext(true)
    const token = localStorage.getItem('token')
    const url_api = `https://www.foryoursweetheart.org/Api/getData?start_date=${startDate}&end_date=${endDate}`
    axios.get(
      url_api,
      {
        headers: {
          Token: token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then((response) => {
      setTimeout(() => {
        setSummaryDataContext(response.data.data)
        setIsLoadingContext(false)
      }, 500);
    })
    .catch((error) => {
      console.log('error', error)
    })
  }

  const getExcelFile = (startDate, endDate) => {
    const token = localStorage.getItem('token')
    const url_api = `https://www.foryoursweetheart.org/Api/createExcel?start_date=${startDate}&end_date=${endDate}`
    axios.get(
      url_api,
      {
        headers: {
          Token: token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error', error)
    })
  }

  const getSummaryDataContext = (startDate, endDate) => {
    fetchSummary(startDate, endDate)
    getExcelFile(startDate, endDate)
  }

  // useEffect
  useEffect(() => {
    if (isLoggedInContext) {
      // get initial data summary
      const today = dayjs();
      const yesterday = today.add(-1, "day")
      const lastWeek = today.add(-7, "day")
      getSummaryDataContext(lastWeek.format(), yesterday.format());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedInContext]);

  const dashboardStateStore = {
    isLoggedInContext,
    isLoadingContext,
    summaryDataContext,
    linkExportContext,
  }

  const dashboardActionStore = {
    loggedInContext,
    getSummaryDataContext,
  }

  return (
    <>
      <DashboardStateContext.Provider value={ dashboardStateStore }>
        <DashboardActionContext.Provider value={ dashboardActionStore }>
          { children }
        </DashboardActionContext.Provider>
      </DashboardStateContext.Provider>
    </>
  )
}

export default DashboardProvider