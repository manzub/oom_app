import React, { useEffect, useState } from "react"
import useAppUser from "../data/use-app-user"
import { dateDiffInDays, postData } from "../data/interval";
import NotificationItem from "../components/NotificationItem";

const backendUrl = "http://127.0.0.1:8000/"
export default function Notifications() {
  const { appUser, access_token, updateUserListener } = useAppUser();

  // TODO: dialog component
  const readNotifications = appUser.notifications.filter((x: any) => x.is_read === true)
  const [notifications, setNotifications] = useState<AppUser["notifications"]>([])
  const [toBeDelivered, setTBD] = useState(0);

  function markItemAsRead(notiId: string) {
    const formData = { userId: appUser.userId, notiId }
    postData(`${backendUrl}mark_noti_as_read`, formData, { "Authorization": `Bearer ${access_token}` }).then(response => {
      if (response.status === "success") {
        // TODO: feedback message
        updateUserListener(true)
      }
    })
  }

  function deleteNotiItem(notiId: string) {
    const formData = { userId: appUser.userId, notiId }
    postData(`${backendUrl}delete_noti_item`, formData, { "Authorization": `Bearer ${access_token}` }).then(response => {
      if (response.status === "success") {
        // TODO: feedback message
        updateUserListener(true)
      }
    })
  }

  useEffect(() => {
    if (appUser.notifications) {
      let unreadMessages: any[] = []
      let tbd = 0;
      appUser.notifications.forEach((noti_item: any) => {
        const noti_time = new Date(noti_item.created)
        const today_time = new Date()
        const diffDays = dateDiffInDays(noti_time, today_time)

        if (diffDays > 0) {
          if (!noti_item.is_read) {
            unreadMessages.push({ ...noti_item, diffDays })
          }
        } else {
          tbd++
        }
      })
      setTBD(tbd)
      setNotifications(unreadMessages)
    }
  }, [appUser])

  return (<div className="p-2">
    {toBeDelivered > 0 && <div className="tbd">
      <p className="noti__menuLink" style={{ fontSize: 20, textDecoration: "underline" }}>
        To Be Delivered.... {toBeDelivered}
        <span className="text-danger">!</span>
      </p>
      <div className="small p-2">Come Back Tomorrow AM</div>
    </div>}
    {(appUser.notifications.length === 0 || (toBeDelivered === 0 && appUser.notifications.length === 0)) && <p className="noti__menuLink" style={{ fontSize: 20, textDecoration: "underline" }}>
      Nothing to see here
      <span className="text-danger">!</span>
    </p>}

    {notifications.length > 0 && <React.Fragment>
      <div className="box shadow-sm bg-light mb-3">
        <div className="box-title border-bottom p-3">
          <h6 className="m-0">Recent</h6>
        </div>
        <div className="box-body p-0">
          {notifications.map((item, idx) => <NotificationItem item={item} callback={() => {
            if (window.confirm('Mark Item as Read?')) {
              markItemAsRead(item.notiId)
            }
          }} key={idx} />)}
        </div>
      </div>
    </React.Fragment>}

    {appUser.notifications.length > 0 && <React.Fragment>
      {readNotifications.length > 0 && <React.Fragment>
        <div className="box shadow-sm bg-light mb-3">
          <div className="box-title border-bottom p-3">
            <h6 className="m-0">Older</h6>
          </div>
          <div className="box-body p-0">
            {readNotifications.map((item: any, idx: number) => <NotificationItem item={item} callback={() => {
              if (window.confirm('Delete this item?')) {
                deleteNotiItem(item.notiId)
              }
            }} key={idx} />)}
          </div>
        </div>
      </React.Fragment>}
    </React.Fragment>}
  </div>)
}