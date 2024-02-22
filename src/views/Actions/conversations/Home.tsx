import { useNavigate } from "react-router-dom"

export default function Conversations({ user }: { user: AppUser }) {
  const navigate = useNavigate();


  return (
    <div>
      <button onClick={() => navigate(-1)}>close</button>
      <p>saved conversations.... {user.conversations?.length}</p>
      <button onClick={() => navigate('new_conversation')}>start new</button>
    </div>
  )
}