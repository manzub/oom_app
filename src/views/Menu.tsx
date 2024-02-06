import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const menus = [
  { title: "Downwind", path: "/downwind" },
  { title: "Clear Your Sh*t", path: "/clearyoursht" },
  { title: "Treat Yo' Future Self", path: "/forfutureself" },
  { title: "Conversations", path: "/conversations" },
  { title: "Paws & Reflect", path: "/pawsnreflect" },
  { title: "Journals", path: "/journals" },
]

function Menu({ appUser }: { appUser: AppUser }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastIndex, setLastIndex] = useState<number>()
  const [pages, setPages] = useState<any[]>([])

  // notifications
  const [activeNotifications, setActionNotifications] = useState<AppUser["notifications"][]>([])

  useEffect(() => {
    if(appUser) {
      if(appUser.notifications.length > 0) {
        const activeNotis = appUser.notifications.map(noti_item => {
          // check active state and is_read status
          // map is_read = false and current day = next day
        })
      }
    }
  }, [])

  const per_page = 3
  const indexes = Array.from({ length: menus.length / per_page }, (v, i) => i)

  useEffect(() => {
    if (currentIndex !== lastIndex) {
      const pages = menus.slice(per_page * currentIndex, per_page * (currentIndex + 1))
      setPages(pages)
      setLastIndex(currentIndex)
    }
  }, [currentIndex, lastIndex])


  return (
    <div>
      <h1>Logo Here</h1>
      <p>You're right at oom.</p>
      <br />
      <br />
      <br />
      <p>Notifications.... {appUser?.notifications.length}!</p>
      <div className="d-flex flex-column align-items-start justify-content-between">
        {currentIndex === indexes[indexes.length - 1] && <button onClick={() => setCurrentIndex(currentIndex - 1)}>Back...</button>}
        {pages.map((item, idx) => <NavLink key={idx} to={item.path}>{item.title}</NavLink>)}
        {currentIndex !== indexes[indexes.length - 1] && <button onClick={() => setCurrentIndex(currentIndex + 1)}>More...</button>}
      </div>
    </div>
  )
}

export default Menu