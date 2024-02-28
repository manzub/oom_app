import React from "react";
import { useNavigate } from "react-router-dom"
import HeaderItem from "../../../components/HeaderItem";
import MenuNav from "../../../components/MenuNav";
import './conversations.css'
import { ChevronForwardOutline, FolderOpenOutline } from "react-ionicons";

export default function Conversations({ user }: { user: AppUser }) {
  const conversations = user.conversations
  const menus = [
    { title: "New Conversation", color: "#EC5ABF", emoticon: "💬", path: `conversation/${user.userId}/0` },
  ]

  const navigate = useNavigate()

  return (
    <div className="mainPage">
      <HeaderItem title="Conversations" />
      <div className="mainContent d-flex flex-column justify-content-evenly">
        <div className="introImage d-flex justify-content-center">
          <div style={{ width: '150px', height: '150px', backgroundColor: '#e3e3e3' }}></div>
        </div>
        <div className="conversations p-4 d-flex flex-column-reverse" style={{ flex: 1, width: '100%', height: '100%' }}>
          {conversations?.length === 0 && <p className="p-4 fw-bold text-muted" style={{ fontSize: '20px', textDecoration: "underline" }}>No conversations yet</p>}
          {conversations?.length > 0 && <div>
            <h3 style={{marginBottom:'30px',fontWeight:600}}>Saved</h3>
            {conversations?.map((item, idx) => <div className="sv-conv-item d-flex p-1 gap-3 align-items-baseline" style={{ width: '100%', textDecoration: 'underline', }} key={idx} onClick={() => navigate(`conversation/${user.userId}/`+item.convId)}>
              <FolderOpenOutline width="34px" height="34px" />
              <p>{item.convId.substring(0, 15)}...</p>
              <ChevronForwardOutline width="27px" height="27px" />
            </div>)}
          </div>}
        </div>

        <div className="bottomActions" style={{ flex: 1, width: '100%', height: '100%' }}>
          <MenuNav menus={menus} />
        </div>
      </div>
    </div>
  )
}