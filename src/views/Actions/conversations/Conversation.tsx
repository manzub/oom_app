import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useNavigate, useParams } from "react-router-dom"
import HeaderItem from "../../../components/HeaderItem"
import './conversations.css'
import { PaperPlaneOutline } from "react-ionicons"
import useAppUser from "../../../data/use-app-user"
import toast from "react-hot-toast"
import { postData } from "../../../data/interval"

const randomWelcome = ['Hi', 'How can i help', 'How are you doing today']
const backendUrl = 'http://127.0.0.1:8000'
export default function Conversation() {
  const params = useParams()
  const navigate = useNavigate()
  const { appUser, access_token, updateUserListener } = useAppUser()

  const [convId, setConvId] = useState('');
  const [conversations, updateConversations] = useState<string[]>([randomWelcome[Math.ceil(Math.random() * randomWelcome.length - 1)]])
  const [waiting_reply, setWatingStatus] = useState(false)
  const [userInput, updateUserInput] = useState("")


  async function processSubmit() {
    setWatingStatus(true)
    const toastId = toast.loading('Waiting for reply')

    const formData = { message: userInput, userId: appUser.userId }
    const response = await postData(`${backendUrl}/response`, formData, { "Authorization": `Bearer ${access_token}` })
    if (response.status === "success") {
      // do something with response
      console.log("responded")
      updateConversations([...conversations, userInput, response.message])
      updateUserInput("")
      setWatingStatus(false)
      toast.remove(toastId)
    }
  }

  useEffect(() => {
    if (convId === '') {
      if (params.convId) {
        if (params.convId !== '0') {
          setConvId(params.convId)
          let saved_conversations = appUser.conversations.find((x: any) => x.convId === params.convId)
          if (saved_conversations) {
            updateConversations(saved_conversations.messages);
          } else {
            navigate('/404')
          }
        } else {
          setConvId(uuidv4())
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convId, params.convId])

  useEffect(() => {
    async function saveConversation() {
      if (conversations.length > 2) {
        let json_msg = JSON.stringify(conversations)
        const formData = { userId: params.userid, message: json_msg, convId: convId }
        const response = await postData(`${backendUrl}/save_conversation`, formData, { "Authorization": `Bearer ${access_token}` })
        if (response.status === "success") {
          updateUserListener(true)
          toast.success("conversation autosaved!", { icon: "💾" })
          console.log("saved", [...response.data].length)
        }
      }
    }

    const updateConvo = setInterval(saveConversation, 3000);

    return () => clearInterval(updateConvo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations])

  return (
    <div className="mainPage">
      <HeaderItem title="" />
      <div className="mainContent">
        <div className="chat-container p-4">
          <div className="conversations">
            <div className="messages">
              {conversations.map((item, idx) => <React.Fragment key={idx}>
                <div className={`bubble ${(idx % 2 === 0) ? "left" : "right"}`}>{item}</div>
              </React.Fragment>)}
              {waiting_reply && <div className="bubble left">...</div>}
            </div>
          </div>
        </div>

        <div className="chat-controls" style={{ position: 'absolute', bottom: '0', width: '100%' }}>
          <div style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}>
            <input
              type="text"
              style={{ width: '80%', height: '50px' }}
              className="chat-form form-control"
              value={userInput}
              onChange={(event) => updateUserInput(event.target.value)} />
            <button className="btn" style={{ width: '80px', backgroundColor: '#ffc800', borderRadius: '0px' }} onClick={processSubmit}>
              <PaperPlaneOutline width="27px" height="27px" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}