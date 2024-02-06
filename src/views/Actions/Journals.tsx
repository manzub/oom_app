import { useNavigate } from "react-router-dom"

export default function Journals() {
  const navigate = useNavigate()

  return(
    <div>
      <h5><button onClick={() => navigate(-1)}>close</button> Write how you are feeling today</h5>
    </div>
  )
}