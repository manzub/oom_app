import { useEffect } from "react";

export const interval = (delay = 0) =>
/** @param {() => void} callback */ callback =>
    useEffect(() => {
      const id = setInterval(callback, delay)

      return () => clearInterval(id)
    }, [callback])


export function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export async function postData(url = "", data = {}, headers = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
  })
  if (response.status === 403) {
    // TODO: renew token
    fetchNewToken()
  }
  return response.json()
}

async function fetchNewToken() {
  const savedUser = JSON.parse(localStorage.getItem('_app_def_user_1.0'))
  if (savedUser.userId) {
    const response = await postData(`http://127.0.0.1:8000/auth/new_token?userId=${savedUser.userId}`)
    if (response.status === "success") {
      localStorage.setItem('_app_usr_access', JSON.stringify(response.data))
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
  }
}