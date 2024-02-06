import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const backendUrl = 'http://127.0.0.1:8000'
export default function NewConversation() {
  const [conversations, updateConversations] = useState<string[]>(['hi', 'how can i help'])
  const [waiting_reply, setWatingStatus] = useState(false)
  const [userInput, updateUserInput] = useState("")

  const navigate = useNavigate()

  // TODO: save to file and provide options for new conversation
  function processSubmit() {
    setWatingStatus(true)

    const postData = { msg: userInput }
    axios.post(`${backendUrl}/response`, postData).then(response => {
      // do something with response
      console.log(response.data)
      updateConversations([...conversations, userInput, response.data])
      updateUserInput("")
      setWatingStatus(false)
    })
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>close</button>
      <div className="chat-container">
        <div className="conversations">
          {conversations.map((item, idx) => <p key={idx} style={{marginBottom: '5px'}}>
            <span style={{width: '100%', float: (idx % 2 === 0) ? "left" : "right"}}>{item}</span>
          </p>)}
          {waiting_reply && <p>...</p> }
        </div>
        <div className="chat-controls">
          <input type="text" value={userInput} onChange={(event) => updateUserInput(event.target.value)} />
          <button onClick={processSubmit}>send</button>
        </div>
      </div>
    </div>
  )
}