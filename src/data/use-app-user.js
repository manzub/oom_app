import { useEffect, useState } from "react";
import { postData } from "./interval";

const appUserKey = '_app_def_user_1.0';
const appUserToken = '_app_usr_access'
const backendUrl = 'http://127.0.0.1:8000'

export default function useAppUser() {
  const [loading, setLoadingState] = useState(true);
  const [appUser, setAppUser] = useState(JSON.parse(localStorage.getItem(appUserKey)))
  const [access_token, setToken] = useState(JSON.parse(localStorage.getItem(appUserToken)))
  const [userStateChanged, updateUserListener] = useState(true)

  async function setupOOMUser() {
    const response = await fetch(`${backendUrl}/setup_oom_user`);
    const data = await response.json();
    if (data) {
      if (data.status === "success") {
        const user = data.data;
        postData(`${backendUrl}/auth/new_token?userId=${user.userId}`).then(result => {
          if (result.status === "success") {
            const token = result.data
            // save results
            localStorage.setItem(appUserKey, JSON.stringify(user))
            localStorage.setItem(appUserToken, JSON.stringify(token))
            setAppUser(user)
            setToken(token)
          }
        })
      }
    }
  }

  useEffect(() => {
    if (userStateChanged) { // get latest user from database
      console.log('state changed')
      // TODO: get new token after success
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
        setupOOMUser().then(_ => {
          setLoadingState(true)
        })
      } else {
        loading && setLoadingState(!loading);
      }
    }

    return () => listener()
  }, [appUser, loading])

  return { loading, appUser, access_token, updateUserListener }
}