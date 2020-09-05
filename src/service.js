import axios from "./axiosHelper";

class ActeDataService {
    get() {
        return axios.get(`/ping`).then(response => { return response.data });
    }
    pdf() {
        return axios.get(`/export/pdf`, {
            responseType: 'pdf'
        });
    }
    download_pdf(body) {
        return axios.post(`/export/pdf`, body, {
            responseType: 'blob'
        });
    }
}

export default new ActeDataService();