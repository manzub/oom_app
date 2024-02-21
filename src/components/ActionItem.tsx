import { CheckmarkOutline, CloseSharp } from "react-ionicons";
import "./ActionItem.css"
import { useState } from "react";

export default function ActionItem({ activity, popOut }: { activity: string, popOut: Function }) {

  const [entries, setEntry] = useState<string[]>([])
  const [typing, setTyping] = useState('')

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      setEntry([...entries, typing])
      setTyping('')
    }
  }

  return (
    <div className="actionItems" style={{ backgroundColor: "#1E63FF" }}>
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

        <div className="contentB">
          <div className="contentM">
            <div className="items">
              <h3>{activity}</h3>
              <div className="pt-3 actionItem__list">
                <div className="listItem text-muted">
                  {entries?.map((item, idx) => <p style={{ fontSize: 20 }} className="blockquote-footer text-dark" key={idx}>{item}</p>)}
                </div>
                <div className="listItem__input">
                  <textarea
                    value={typing}
                    onChange={({ target }) => setTyping(target.value)}
                    onKeyDown={handleKeyDown}
                    className="input__textarea form-control"
                    placeholder="Write your message..."></textarea>
                </div>
              </div>
            </div>

            <div className="actionItem__controls">
              <button onClick={() => popOut()} className="btn">
                <CheckmarkOutline width="54px" height="54px" />
              </button>
            </div>
          </div>

          <div className="contentF">
            <p className="text-center">"enter/return" for new line. <strong>submit with button</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}