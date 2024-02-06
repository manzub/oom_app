import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
// import { useLongPress } from "use-long-press";

function ClearYourSht() {
  const navigate = useNavigate();

  const [running, setRunning] = useState(true);
  const [conversation, setConversation] = useState<{ message: string, needs_action?: boolean }[]>([])
  const [typing, setTyping] = useState('')
  const [waiting_reply, setWatingStatus] = useState(true)


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
  // create array from 8 items
  let arr = Array.from(Array(8).keys()).map(x => `${x++}`);
  const [sht, updateList] = useState(arr)
  const [to_delete, setToDelete] = useState(-1);
  // const [drag_start, setDragStatus] = useState(false)

  const pop = (index: number) => {
    const items = sht
    items.length === 0 && updateList([])

    if (items.length !== 0) {
      items.splice(index, 1)
      updateList(items)
    }

    setToDelete(-1)
    console.log('popped')
  }

  // const bind = useLongPress(() => (!drag_start ? pop(to_delete) : undefined), { threshold: 1000, cancelOnMovement: 10 });

  function onDragStart(index: number) {
    // setDragStatus(true)
    setToDelete(index)
  }
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }
  function onDrop(e: React.DragEvent) {
    // setDragStatus(false)
    // console.log('dropped', items[to_delete])
    pop(to_delete)
  }

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
    <div>
      <button onClick={() => navigate(-1)}>close</button>
      {!game_start && <React.Fragment>
        <h3>Clear your sh*t</h3>
        <br />
        <ul>
          {conversation.map((item, idx) => <React.Fragment key={idx}>
            <li>{item.message}</li>
            {item.needs_action && <div>
              <button onClick={() => continueTopic(idx)}>yes</button>
              <button onClick={() => endTopic(idx)}>x</button>
            </div>}
          </React.Fragment>)}
          {waiting_reply && <li><input value={typing} onChange={({ target }) => setTyping(target.value)} autoFocus type="text" onKeyDown={keyDwonHandler} placeholder="enter your message" /></li>}
          {waiting_reply && <li>...</li>}
        </ul>
      </React.Fragment>}
      {game_start && <React.Fragment>
        <div style={{ marginTop: 5 }}>
          {sht.map((item, idx) => <p
            key={item}
            onDragStart={() => onDragStart(idx)}
            draggable>trash</p>)}
          <p onDrop={onDrop} onDragOver={onDragOver}>bin</p>
        </div>
        {(game_start && sht.length === 0) && <p>Good Job</p>}
      </React.Fragment>}
    </div>
  )
}

export default ClearYourSht