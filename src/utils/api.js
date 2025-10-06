import axios from "axios"


// chiamata con axios

export const fetchData = (url) => {
    return axios(url)
        .then(response => response?.data)
        .catch(error => {
            console.error(error);
            return error;
        })
}