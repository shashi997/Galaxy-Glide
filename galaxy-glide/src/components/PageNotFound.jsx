import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
    const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center'}}>
        <h2> 404 PageNotFound</h2>
        <button onClick={() => navigate('/')}>Home</button>
    </div>
  )
}

export default PageNotFound