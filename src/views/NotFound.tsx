import { useNavigate } from "react-router-dom"

function NotFound(){
  const navigate = useNavigate()

  return(
    <div>
      <h5>page not found</h5>
      <button onClick={()=>navigate('/')}>go home</button>
    </div>
  )
}

export default NotFound