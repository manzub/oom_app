import { useNavigate } from "react-router-dom"

export default function Conversations() {
  const navigate = useNavigate();


  return(
    <div>
      <button onClick={() => navigate(-1)}>close</button>
      <p>saved conversations.... 0</p>
      <button onClick={() => navigate('new_conversation')}>start new</button>
    </div>
  )
}