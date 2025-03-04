import axios, { type AxiosInstance } from "axios";

let apiInstance: AxiosInstance 

function getUrlBase() {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
        return "http://localhost:5000"
    } else {
        return "https://forecasting-unemployment-351485952743.asia-east1.run.app";
    }
}

export default function getApi() {
    if (!apiInstance && typeof window !== "undefined") {
        apiInstance = axios.create({
            baseURL: getUrlBase(),
            withCredentials: true, // Allows cookies to be sent
        });
    }
    return apiInstance;
}