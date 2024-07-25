import axios from "axios";

const instance = axios.create({
    baseURL:"https://dsagymserver.vercel.app",
    headers: {
        key: process.env.REACT_APP_KEY
    }
})

export default instance;