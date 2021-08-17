import React, {useEffect} from 'react'
import {
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'
import {useDashboardStateContext, useDashboardActionContext} from '../../contexts/DashboardContext'
import Login from './Login'
import Main from './Main'

const Admin = () => {
  // router
  const history = useHistory()

  // context
  const {isLoggedInContext} = useDashboardStateContext()
  const {loggedInContext} = useDashboardActionContext()

  useEffect(() => {
    const hadToken = localStorage.getItem('token')
    if (!hadToken) {
      history.push('/admin/login')
    } else {
      loggedInContext(true)
    }
  }, [history, isLoggedInContext, loggedInContext])

  return (
    <Switch>
      <Route exact path="/admin/main">
        <Main />
      </Route>
      <Route path="/admin/login">
        <Login />
      </Route>
    </Switch>
  )
}

export default Admin
