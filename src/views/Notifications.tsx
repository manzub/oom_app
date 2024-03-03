import React, { useEffect, useState } from "react"
import useAppUser from "../data/use-app-user"
import { MailUnreadOutline, TrashOutline } from "react-ionicons";
import { dateDiffInDays } from "../data/interval";
import axios from "axios";

const backendUrl = "http://127.0.0.1:8000/"
export default function Notifications() {
  const { appUser, updateUserListener }: { appUser: AppUser, updateUserListener: Function } = useAppUser();

  // TODO: dialog component
  const [notifications, setNotifications] = useState<{ isRead: any[], unread: any[] }>({ isRead: [], unread: [] })
  const [toBeDelivered, setTBD] = useState(0);

  function markItemAsRead(notiId: string) {
    const postData = { userId: appUser.userId, notiId }
    axios.post(`${backendUrl}mark_noti_as_read`, postData).then(response => {
      if (response.status === 200) {
        // TODO: more status codes
        console.log(response.data)
        updateUserListener()
      }
    })
  }

  function deleteNotiItem(notiId: string) {
    const postData = { userId: appUser.userId, notiId }
    axios.post(`${backendUrl}delete_noti_item`, postData).then(response => {
      if (response.status === 200) {
        // TODO: more status codes
        console.log(response.data)
        updateUserListener()
      }
    })
  }

  useEffect(() => {
    if (appUser.notifications) {
      let isReadMessages: any[] = []
      let unreadMessages: any[] = []
      let tbd = 0;
      appUser.notifications.forEach(noti_item => {
        const noti_time = new Date(noti_item.created)
        const today_time = new Date()
        const diffDays = dateDiffInDays(noti_time, today_time)

        if (diffDays > 0) {
          noti_item.is_read && isReadMessages.push({ ...noti_item, diffDays })
          !noti_item.is_read && unreadMessages.push({ ...noti_item, diffDays })
        } else {
          tbd++
        }

      })

      setTBD(tbd)
      setNotifications({ isRead: isReadMessages, unread: unreadMessages })
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
    {notifications.unread.length > 0 && <React.Fragment>
      <div className="box shadow-sm bg-light mb-3">
        <div className="box-title border-bottom p-3">
          <h6 className="m-0">Recent</h6>
        </div>
        <div className="box-body p-0">
          {notifications.unread.map((item, idx) => (<div key={idx} className="p-3 d-flex align-items-center justify-content-between bg-light border-bottom osahan-post-header" style={{ width: '100%' }}>
            <div className="font-weight-bold mr-3">
              <div className="text-truncate">FROM PAST YOU:</div>
              <div className="small">{decodeURIComponent(item.message)}</div>
            </div>
            <div className="ml-auto mb-auto">
              <div className="btn-group">
                <button onClick={() => {
                  if (window.confirm('Mark Item as Read?')) {
                    markItemAsRead(item.notiId)
                  }
                }} type="button" className="btn btn-light btn-sm p-2 rounded dropdown-item">
                  <MailUnreadOutline title="Mark as Read" width="20px" height="20px" />
                </button>
              </div>
              <br />
              <div className="text-muted text-right pt-1">{item.diffDays}d</div>
            </div>
          </div>))}
        </div>
      </div>
    </React.Fragment>}

    {notifications.isRead.length > 0 && <React.Fragment>
      <div className="box shadow-sm bg-light mb-3">
        <div className="box-title border-bottom p-3">
          <h6 className="m-0">Older</h6>
        </div>
        <div className="box-body p-0">
          {notifications.isRead.map((item, idx) => (<div key={idx} className="p-3 d-flex align-items-center justify-content-between bg-light border-bottom osahan-post-header" style={{ width: '100%' }}>
            <div className="font-weight-bold mr-3">
              <div className="text-truncate">FROM PAST YOU:</div>
              <div className="small">{decodeURIComponent(item.message)}</div>
            </div>
            <div className="ml-auto mb-auto">
              <div className="btn-group">
                <button onClick={() => {
                  if (window.confirm('Delete this Item?')) {
                    deleteNotiItem(item.notiId)
                  }
                }} type="button" className="btn btn-light btn-sm p-2 rounded dropdown-item">
                  <TrashOutline title="Mark as Read" width="20px" height="20px" />
                </button>
              </div>
              <br />
              <div className="text-muted text-right pt-1">{item.diffDays}d</div>
            </div>
          </div>))}
        </div>
      </div>
    </React.Fragment>}
  </div>)
}