import { CloseSharp, HomeOutline } from "react-ionicons"
import "./Affirmations.css"
import { useNavigate } from "react-router-dom"
import classNames from "classnames"

// TODO: affirmation color

export default function Affirmations({ bgColor, emoji, title, textSize, footerText, popOut }: { bgColor: string, emoji: string, title: string, textSize?: string, footerText: string, popOut: Function }) {
  const navigate = useNavigate()

  return (
    <div className="affirmations" style={{ backgroundColor: bgColor }}>
      <div className="mainContent">
        <div className="headerItem">
          <div className="headerActions">
            <span></span>
            <span></span>
            <span onClick={() => popOut()} className="headerAction__item">
              <CloseSharp width="55px" height="55px" color='#000' />
            </span>
          </div>
        </div>

        <div className="contentBody">
          <div className="contentMain">
            <div className="contentMain__items">
              <span className="contentMain__emoji">{emoji}</span>
              <h2 className={classNames("contentMain__title", { "md": textSize })}>{title}</h2>
              <p></p>
              <div className="contentMain__action">
                <button onClick={() => navigate("/")} className="btn btn-default d-flex gap-2">
                  <HomeOutline />
                  Home
                </button>
              </div>
            </div>
          </div>
          <div className="contentFooter">
            <p>{footerText}</p>
          </div>
        </div>
      </div>
    </div>
  )
}