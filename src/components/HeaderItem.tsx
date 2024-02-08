import { useEffect, useState } from "react";
import { CloseOutline, NotificationsSharp } from "react-ionicons";
import { useLocation, useNavigate } from "react-router-dom";

export default function HeaderItem({ closeUrl, title, activeNotis }: { closeUrl?: string, title: string, activeNotis?: any[] }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [closeable, setCloseable] = useState(false)

  const closeItem = () => closeUrl ? navigate(closeUrl) : navigate(-1)

  useEffect(() => {
    setCloseable(location.pathname !== "/" ? true : false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeable])

  return (
    <div className="headerItem">
      <div className="headerActions">
        {(activeNotis && activeNotis.length > 0) ? <button onClick={() => navigate("/more/notifications")} className="headerAction__item btn btn-default">
          <NotificationsSharp width="30px" height="30px" color='#000' shake />
        </button> : <span></span>}
        <h1 className="headerItem__title">{title}</h1>
        {closeable ? <span onClick={closeItem} className="headerAction__item">
          <CloseOutline width="55px" height="55px" color='#000' />
        </span> : <span></span>}
      </div>
    </div>
  )
}