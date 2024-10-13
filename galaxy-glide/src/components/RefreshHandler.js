import React, { useEffect } from 'react'

function RefreshHandler( {setIsAuthenticated}) {


    useEffect(() => {
        const data = localStorage.getItem('user-info')
        const token = JSON.parse(data)?.token
        if (token) {
            setIsAuthenticated(true)
            
        }
    }, [setIsAuthenticated])

  return (
    null
  )
}

export default RefreshHandler