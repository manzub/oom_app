import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { dateDiffInDays } from "../data/interval";
import "./Menu.css"
import logo from "../logo.png";
import HeaderItem from "../components/HeaderItem";
import MenuNav from "../components/MenuNav";

const menus = [
  { title: "Downwind", color: "#EC5ABF", emoticon: "💨", path: "/downwind" },
  { title: "Clear Your Sh*t", color: "#FFC800", emoticon: "💩", path: "/clearyoursht" },
  { title: "Treat Yo' Future Self", color: "#1E63FF", emoticon: "🎈", path: "/forfutureself" },
  { title: "Conversations", color: "#FFC800", emoticon: "💬", path: "/conversations" },
  { title: "Paws & Reflect", color: "#1E63FF", emoticon: "🐶", path: "/pawsnreflect" },
  { title: "Journals", color: "#EC5ABF", emoticon: "📖", path: "/journals" },
]

function Menu({ appUser }: { appUser: AppUser }) {
  // notifications
  const [activeNotifications, setActiveNotifications] = useState<any[]>([])

  useEffect(() => {
    if (appUser) {
      if (appUser.notifications.length > 0) {
        const activeNotis: AppUser["notifications"] = []
        appUser.notifications.forEach(noti_item => {
          // check active state and is_read status
          // map is_read = false and current day = next day
          const noti_time = new Date(noti_item.created)
          const today_time = new Date()
          const diffDays = dateDiffInDays(noti_time, today_time)
          
          if (diffDays > 0 && !noti_item.is_read) {
            activeNotis.push(noti_item)
          }
        })

        setActiveNotifications(activeNotis)
      }
    }
  }, [appUser])

  return (
    <div className="mainPage">
      <HeaderItem title="Home" activeNotis={activeNotifications} />
      <div className="mainContent">
        <div className="menuContent__flex">
          <div className="menuTopItems">
            <div className="d-flex align-items-end justify-content-around" style={{ height: 'calc(100% - 15px)' }}>
              <div className="text-center">
                <img src={logo} width={250} alt="oom_logo" />
                <h5 style={{ fontWeight: "bold" }}>You're right at oom.</h5>
              </div>
            </div>
          </div>

          <div className="menuBottomItems">
            <NavLink to={"/more/notifications"}>
              <p className="noti__menuLink">
                Notifications.... {appUser.notifications.length}
                <span className="text-danger">!</span>
              </p>
            </NavLink>
            <MenuNav menus={menus} has_action={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu