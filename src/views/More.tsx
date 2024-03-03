import { Outlet } from "react-router-dom";
import HeaderItem from "../components/HeaderItem";
import "./More.css"

export default function More() {
  return (<div className="mainPage">
    <HeaderItem title="More" />
    <div className="mainContent">
      <div className="d-flex flex-column justify-content-between" style={{ width: '97%', height: '100%' }}>
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 2 }}>
          <div className="menuOptions p-2">
            <div className="d-flex align-items-center justify-content-between"></div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  </div>)
}