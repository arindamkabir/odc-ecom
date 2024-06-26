import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    }
})

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default axios;