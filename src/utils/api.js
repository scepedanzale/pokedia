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



export const fetchPage = async ({page = 1, pageLimit = 20, maxResults = 20, filters = {}}) => {
    try {
        const offset = (page - 1) * pageLimit;
        const params = { offset, pageLimit, maxResults, filters: JSON.stringify(filters) };
        const res = await axios.get('http://localhost:5000/pokemon', { params });

        return {
            data: res.data.results,   // Pokémon della pagina
            total: res.data.total     // totale Pokémon lato server
        };
    } catch (err) {
        console.error('Errore fetchPage:', err);
        return { data: [], total: 0 };
    }
};