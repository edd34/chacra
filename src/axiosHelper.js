import axios from "axios";

export default axios.create({
    baseURL: "https://intense-castle-64808.herokuapp.com/",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "true"
    }
});