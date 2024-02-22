import React from "react";
import { NavLink, useNavigate } from "react-router-dom"
import HeaderItem from "../../../components/HeaderItem";
import MenuNav from "../../../components/MenuNav";

export default function Conversations({ user }: { user: AppUser }) {
  const conversations = user.conversations
  const menus = [
    { title: "New Conversation", color: "#EC5ABF", emoticon: "💬", path: `new_conversation/${user.userId}` },
  ]

  return (
    <div className="mainPage">
      <HeaderItem title="Conversations" />
      <div className="mainContent d-flex flex-column justify-content-evenly">
        <div className="introImage d-flex justify-content-center">
          <div style={{ width: '150px', height: '150px', backgroundColor: '#e3e3e3' }}></div>
        </div>
        <div className="conversations d-flex flex-column-reverse" style={{ flex: 1, width: '100%', height: '100%' }}>
          {conversations?.length === 0 && <p className="p-4 fw-bold text-muted" style={{ fontSize: '20px', textDecoration: "underline" }}>No conversations yet</p>}
          {conversations?.map((item, idx) => <div key={idx}>
            <NavLink to={`conversation/${item.convId}`}>
              <p>{item.convId.substring(0, 10)}...</p>
            </NavLink>
          </div>)}
        </div>

        <div className="bottomActions" style={{ flex: 1, width: '100%', height: '100%' }}>
          <MenuNav menus={menus} />
        </div>
      </div>
    </div>
  )
}