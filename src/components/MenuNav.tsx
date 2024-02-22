import React, { useState, useEffect } from "react";
import { ArrowDownOutline, ArrowUpOutline, ChevronForwardOutline } from "react-ionicons";
import "./MenuNav.css"
import { useNavigate } from "react-router-dom";

export default function MenuNav({ menus, has_action }: { menus: any[], has_action?: boolean }) {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastIndex, setLastIndex] = useState<number>()
  const [pages, setPages] = useState<any[]>([])

  const setNextIndex = (index: number) => {
    setCurrentIndex(index)
    setLastIndex(index - 1)
  }

  const per_page = 3
  const indexes = Array.from({ length: menus.length / per_page }, (v, i) => i)

  useEffect(() => {
    if (currentIndex !== lastIndex) {
      const pages = menus.slice(per_page * currentIndex, per_page * (currentIndex + 1))
      setPages(pages)
      // setLastIndex(currentIndex)
    }
  }, [menus, currentIndex, lastIndex])
  
  return (
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
      {((menus.length / per_page > 1) && has_action) && <div className="menu__actions">
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
      </div>}
    </div>
  )
}