import React from "react";
import { NavLink, useNavigate } from "react-router-dom"
import HeaderItem from "../../../components/HeaderItem";

export default function Conversations({ user }: { user: AppUser }) {
  const navigate = useNavigate();

  const conversations = user.conversations


  return (
    <div className="mainPage">
      <HeaderItem title="" />
      <div className="mainContent">
        <div className="conversations">
          {conversations?.map((item, idx) => <div key={idx}>
            <NavLink to={`conversation/${item.convId}`}>
              <p>{item.convId.substring(0, 10)}...</p>
            </NavLink>
          </div>)}
          {conversations?.length === 0 && <p>No conversations yet</p>}
        </div>

        {/* TODO: menu */}
      </div>
      <p>saved conversations.... {user.conversations?.length}</p>
      <button onClick={() => navigate('new_conversation')}>start new</button>
    </div>
  )
}