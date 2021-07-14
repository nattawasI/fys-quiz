import React, { useState, createContext, useContext, useEffect } from 'react'

const UserStateContext = createContext()
const UserActionContext = createContext()

export const useUserStateContext = () => {
  return useContext(UserStateContext)
}

export const useUserActionContext = () => {
  return useContext(UserActionContext)
}

const UserProvider = ({ children }) => {
  // state
  const [friendInfoContext, setFriendNameContext] = useState({})

  // key store
  const KEY_STORAGE = 'friendInfo'

  // function
  const addFriendInfoContext = ({ name, gender }) => {
    const friendInfo = { name, gender }
    setFriendNameContext(friendInfo)

    sessionStorage.setItem(KEY_STORAGE, JSON.stringify(friendInfo))
  }

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem(KEY_STORAGE))

    if (data) {
      setFriendNameContext(data)
    }
  }, [])

  const userStateStore = { // use this pass to value
    friendInfoContext,
  }

  const userActionStore = { // use this pass to value
    addFriendInfoContext,
  }

  return (
    <>
      <UserStateContext.Provider value={ userStateStore }>
        <UserActionContext.Provider value={ userActionStore }>
          { children }
        </UserActionContext.Provider>
      </UserStateContext.Provider>
    </>
  )
}

export default UserProvider