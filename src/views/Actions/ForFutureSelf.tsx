import { useState } from "react"
import DOMPurify from "dompurify";
import axios from "axios";
import HeaderItem from "../../components/HeaderItem";
import Affirmations from "../../components/Affirmations";

function ForFutureSelf({ appUser, updateListener }: { appUser: AppUser, updateListener: Function }) {
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("self-love");
  const [sent_success, setSendStatus] = useState(false)


  function popOut() {
    setMessage("")
    setTopic("")
    setSendStatus(false)
  }

  function sendLove() {
    // escape html strings, remove white spaces
    let cleanedHtml = DOMPurify.sanitize(message);
    cleanedHtml = encodeURIComponent(cleanedHtml)

    // save in database
    // TODO: to protect endpoints and add auth
    // TODO: topics
    const backendUrl = "http://127.0.0.1:8000/send_love"
    const postData = { userId: appUser.userId, message: cleanedHtml, topic: topic }
    axios.post(backendUrl, postData).then(response => {
      // TODO: do something with response [alert user]
      updateListener(true)
      console.log(response.data)
      // eslint-disable-next-line eqeqeq
      if (response.data.response == 'Updated') {
        setMessage("")
        setTimeout(() => {
          setSendStatus(true)
        }, 1000);
      }
    })
  }

  return (
    <div className="mainPage">
      <HeaderItem title="" />
      <div className="mainContent">
        <div style={{ height: 'calc(100% - 10px)' }} className="p-4 d-flex flex-column align-items-center justify-content-between">
          <h1 className="text-center fw-bold">Tell your future self something positive.</h1>
          <div className="card" style={{ width: "100%" }}>
            <div className="card-header">
              <select value={topic} onChange={(event) => setTopic(event.target.value)} className="form-select">
                <option value="self-love">Self Love</option>
              </select>
            </div>
            <div className="card-body">
              <textarea
                className="form-control"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8} cols={15} />
            </div>
          </div>
          <button className="btn btn-lg btn-primary" onClick={sendLove}>send love</button>
          <p className="text-center text-uppercase" style={{fontSize: "12px"}}>this message will be delivered <strong>tomorrow am</strong></p>
        </div>
      </div>

      {sent_success && <Affirmations
        emoji="💌💨"
        bgColor="#1D64FF"
        title="Your future self is gonna love you."
        textSize="md"
        footerText="Send Another Positive Affirmation"
        popOut={() => popOut()} />}
    </div>
  )
}

export default ForFutureSelf