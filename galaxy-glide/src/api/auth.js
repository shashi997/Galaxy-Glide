import axios from 'axios'

const api = axios.create({
    baseURL: 'https://backend-server-topaz.vercel.app/auth'
})

export const googleAuth = (code) => {
    return api.get(`/google?code=${code}`)
}
