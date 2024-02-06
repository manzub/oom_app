import { useState } from "react"
import DOMPurify from "dompurify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForFutureSelf({ appUser, updateListener }: { appUser: AppUser, updateListener: Function }) {
  const [message, setMessage] = useState("");
  const [sent_success, setSendStatus] = useState(false)

  const navigate = useNavigate()

  function sendLove() {
    // escape html strings, remove white spaces
    let cleanedHtml = DOMPurify.sanitize(message);
    cleanedHtml = encodeURIComponent(cleanedHtml)

    // save in database
    // TODO: to protect endpoints and add auth
    const backendUrl = "http://127.0.0.1:8000/send_love"
    const postData = { userId: appUser.userId, message: cleanedHtml }
    axios.post(backendUrl, postData).then(response => {
      // TODO: do something with response [alert user]
      updateListener(true)
      console.log(response.data)
      // eslint-disable-next-line eqeqeq
      if (response.data.response == 'Updated') {
        setMessage("")
        setSendStatus(true)
      }
    })
  }

  return (
    <div style={{ marginTop: 10 }}>
      <button onClick={() => navigate(-1)}>close</button>
      <h3>Write a message to your future self.</h3>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={8} cols={15}></textarea>
      <button onClick={sendLove}>send love</button>
      <p>this message will be delivered <strong>tomorrow am</strong></p>
      {sent_success && <p>Good job <button onClick={() => navigate(-1)}>close/x</button></p>}
    </div>
  )
}

export default ForFutureSelf