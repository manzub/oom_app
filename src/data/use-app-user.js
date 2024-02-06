import { useEffect, useState } from "react";

const appUserKey = '_app_def_user_1.0';
const backendUrl = 'http://127.0.0.1:8000'

export default function useAppUser() {
  const [loading, setLoadingState] = useState(true);
  const [appUser, setAppUser] = useState(JSON.parse(localStorage.getItem(appUserKey)))
  const [userStateChanged, updateUserListener] = useState(true)

  useEffect(() => {
    if (userStateChanged) { // get latest user from database
      console.log('state changed')
      fetch(`${backendUrl}/get_user/${appUser?.userId}`).then(res => res.json()).then(data => {
        setAppUser(data.user)
        localStorage.setItem(appUserKey, JSON.stringify(data.user))
        updateUserListener(false)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStateChanged])

  useEffect(() => {
    const listener = () => {
      if (!appUser || appUser === null) {
        fetch(`${backendUrl}/setup_oom_user`).then(res => res.json()).then(data => {
          localStorage.setItem(appUserKey, JSON.stringify(data))
          setAppUser(data)
          setLoadingState(true) // reset application to loading state
        })
      } else {
        loading && setLoadingState(!loading);
      }
    }

    return () => listener()
  }, [appUser, loading])

  return { loading, appUser, updateUserListener }
}