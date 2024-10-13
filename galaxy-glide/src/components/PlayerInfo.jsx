import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';


function PlayerInfo() {
  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('user-info')
    const userData = JSON.parse(data)
    setUserInfo(userData)
  })



    return (
      <>
          <h1>Player Info</h1>

          <h1>Welcome {userInfo?.name}</h1>
          <h3>Email: {userInfo?.email}</h3>
          <img src={userInfo?.image} alt={userInfo?.email}/>


      </>
    )
  }
  
  export default PlayerInfo