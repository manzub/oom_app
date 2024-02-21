import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { dateDiffInDays } from "../data/interval";
import "./Menu.css"
import logo from "../logo.png";
import { ArrowDownOutline, ArrowUpOutline, ChevronForwardOutline } from "react-ionicons";
import HeaderItem from "../components/HeaderItem";

const menus = [
  { title: "Downwind", color: "#EC5ABF", emoticon: "💨", path: "/downwind" },
  { title: "Clear Your Sh*t", color: "#FFC800", emoticon: "💩", path: "/clearyoursht" },
  { title: "Treat Yo' Future Self", color: "#1E63FF", emoticon: "🎈", path: "/forfutureself" },
  { title: "Conversations", color: "#FFC800", emoticon: "💬", path: "/conversations" },
  { title: "Paws & Reflect", color: "#1E63FF", emoticon: "🐶", path: "/pawsnreflect" },
  { title: "Journals", color: "#EC5ABF", emoticon: "📖", path: "/journals" },
]

function Menu({ appUser }: { appUser: AppUser }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastIndex, setLastIndex] = useState<number>()
  const [pages, setPages] = useState<any[]>([])

  const navigate = useNavigate()

  const setNextIndex = (index: number) => {
    setCurrentIndex(index)
    setLastIndex(index - 1)
  }

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

  const per_page = 3
  const indexes = Array.from({ length: menus.length / per_page }, (v, i) => i)

  useEffect(() => {
    if (currentIndex !== lastIndex) {
      const pages = menus.slice(per_page * currentIndex, per_page * (currentIndex + 1))
      setPages(pages)
      // setLastIndex(currentIndex)
    }
  }, [currentIndex, lastIndex])


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
                Notifications.... {activeNotifications.length}
                <span className="text-danger">!</span>
              </p>
            </NavLink>
            <div className="menus">
              <div className="menu__nav">
                {pages.map((item, idx) => <React.Fragment key={idx}>
                  <div onClick={() => navigate(item.path)} style={{ backgroundColor: item.color }} className="menu__navItem">
                    <div className="d-flex gap-3 justify-content-center" style={{ alignItems: "center" }}>
                      <span style={{ fontSize: '3rem' }}>{item?.emoticon}</span>
                      <h3 style={{ fontWeight: 900, fontSize: '1.7rem' }}><strong>{item.title}</strong></h3>
                    </div>
                    <ChevronForwardOutline
                      color='#000'
                      height="40px"
                      width="40px"
                    />
                  </div>
                </React.Fragment>)}
              </div>
              <div className="menu__actions">
                {currentIndex === indexes[indexes.length - 1] ? <React.Fragment>
                  <button onClick={() => setNextIndex(currentIndex - 1)} className="menu__nextAction btn">
                    <ArrowUpOutline
                      beat height="50px" width="50px" color="#000"
                      style={{ backgroundColor: 'transparent' }} />
                  </button>
                </React.Fragment> : <React.Fragment>
                  <button onClick={() => setNextIndex(currentIndex + 1)} className="menu__nextAction btn">
                    <ArrowDownOutline
                      beat height="50px" width="50px" color="#000"
                      style={{ backgroundColor: 'transparent' }} />
                  </button>
                </React.Fragment>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu