import axios from "axios";
import { ensureAwake, isColdStartError } from "./coldStart";

export const axioInstance = axios.create({})

// If the (Render free-tier) server is asleep, wait for it to wake, then retry once.
axioInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;
        if (!config || config._coldRetry || !isColdStartError(error)) {
            return Promise.reject(error);
        }
        config._coldRetry = true;
        await ensureAwake();
        return axioInstance(config);
    }
)

export const apiConnector = (method, url, bodyData, headers = {}, params=null) => {
    //  console.log(url)
    return axioInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
        withCredentials: true,
    })
}
