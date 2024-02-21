import React, { useCallback, useEffect, useState } from "react"
import HeaderItem from "../../components/HeaderItem";
// import { useLongPress } from "use-long-press";
import "./ClearYourSht.css"
import { CheckmarkOutline, CloseOutline } from "react-ionicons";
import GameCenter from "../../components/GameCenter";

function ClearYourSht() {

  const [running, setRunning] = useState(true);
  const [conversation, setConversation] = useState<{ message: string, needs_action?: boolean }[]>([])
  const [typing, setTyping] = useState('')
  const [waiting_reply, setWatingStatus] = useState(true)

  const inputElem = useCallback((inputElement: any) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);


  function keyDwonHandler(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      setConversation([...conversation, { message: typing }])
      setTyping('')
    }
  }

  function continueTopic(index: number) { // update the action state and continue conversation
    let current_conversation_chain = conversation
    current_conversation_chain[index].needs_action = false;
    setConversation(current_conversation_chain)
    setWatingStatus(true)
  }

  function endTopic(index: number) { //kill loop
    let current_conversation_chain = conversation
    current_conversation_chain[index].needs_action = false;
    setConversation([...current_conversation_chain, { message: 'Good Job' }])
    setRunning(false)
    setGameStart(true)
  }

  const [game_start, setGameStart] = useState(false);
  

  useEffect(() => {
    if (running) {
      (conversation.length === 0) && setConversation([...conversation, { message: "What's bugging you?" }])

      if (conversation.length > 1 && (conversation.length % 2) === 0) { //waiting for bot reply
        setWatingStatus(false)
        setTimeout(() => {
          setConversation([...conversation, { message: conversation.length === 2 ? 'Admittance is the first step to progress. Anything else?' : 'Keep Writing?', needs_action: true }])
        }, 1000);
      }
    }
  }, [running, conversation, waiting_reply])

  return (
    <div className="mainPage" style={{ overflowY: "auto" }}>
      <HeaderItem title="" />
      <div className="mainContent">
        <div className="p-4">
          {!game_start && <React.Fragment>
            <h3 className="text-center fw-bold" style={{ fontSize: "2rem" }}>Clear your sh*t</h3>
            <div className="messages">
              {conversation.map((item, idx) => <React.Fragment key={idx}>
                <div className={`bubble ${(idx % 2) === 0 ? "left" : "right"}`}>{item.message}</div>
                {item.needs_action && <div className="needs_action">
                  <button onClick={() => continueTopic(idx)} className="btn">
                    <CheckmarkOutline />
                  </button>
                  <button onClick={() => endTopic(idx)} className="btn">
                    <CloseOutline />
                  </button>
                </div>}
              </React.Fragment>)}
              {waiting_reply && <div className="bubble right">
                <input
                  type="text"
                  ref={inputElem}
                  className="message_input"
                  value={typing}
                  onChange={(event) => setTyping(event.target.value)}
                  onKeyDown={keyDwonHandler}
                  placeholder="Enter your message..." />
              </div>}
              {waiting_reply && <div className="bubble left">...</div>}
            </div>
          </React.Fragment>}
          {game_start && <React.Fragment>
            <GameCenter />
          </React.Fragment>}
        </div>
      </div>
    </div>
  )
}

export default ClearYourSht