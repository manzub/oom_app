import { useEffect, useState } from "react"
import DOMPurify from "dompurify";
import HeaderItem from "../../components/HeaderItem";
import Affirmations from "../../components/Affirmations";
import { postData } from "../../data/interval";
import useAppUser from "../../data/use-app-user";
import toast from "react-hot-toast";

const backendUrl = "http://127.0.0.1:8000"
function ForFutureSelf() {
  const [topics_options, setTopicOptions] = useState<any[]>([])
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("self-love");
  const [sent_success, setSendStatus] = useState(false)

  const { appUser, access_token, updateUserListener } = useAppUser()

  function popOut() {
    setMessage("")
    setTopic("")
    setSendStatus(false)
  }

  function sendLove() {
    // escape html strings, remove white spaces
    let cleanedHtml = DOMPurify.sanitize(message);
    cleanedHtml = encodeURIComponent(cleanedHtml)

    const formData = { userId: appUser.userId, message: cleanedHtml, topic: topic }
    if (topics_options.includes(topic)) {
      const promise = postData(`${backendUrl}/send_love`, formData, { "Authorization": `Bearer ${access_token}` }).then(response => {
        if (response.status === "success") {
          updateUserListener(true)
          console.log(response)
          setMessage("")
          setTimeout(() => {
            setSendStatus(true)
          }, 1000);
        } else {
          toast.error(response.message || "error occurred")
        }
      }).catch(error => toast.error("Oops! could not connect to backend"))
      toast.promise(promise, {
        loading: "Sending...",
        success: "Done!.",
        error: "Could not save"
      })
    } else {
      toast.error('Please select a Topic!')
    }
  }

  useEffect(() => {
    async function getTopics() {
      if (topics_options.length === 0) {
        const response = await (await fetch(`${backendUrl}/topics`)).json()
        if (response.status === "success") {
          setTopicOptions(response.data)
        }
      }
    }
    getTopics()
  }, [topics_options])

  return (
    <div className="mainPage">
      <HeaderItem title="" />
      <div className="mainContent">
        <div style={{ height: 'calc(100% - 10px)' }} className="p-4 d-flex flex-column align-items-center justify-content-between">
          <h1 className="text-center fw-bold">Tell your future self something positive.</h1>
          <div className="card" style={{ width: "100%" }}>
            <div className="card-header">
              <select value={topic} onChange={(event) => setTopic(event.target.value)} className="form-select">
                <option value="">Select Topic</option>
                {topics_options.map(item => <option key={item} value={item}>{String(item).toUpperCase()}</option>)}
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
          <button className="btn btn-lg btn-primary text-uppercase" onClick={sendLove}>send love</button>
          <p className="text-center text-uppercase" style={{ fontSize: "12px" }}>this message will be delivered <strong>tomorrow am</strong></p>
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