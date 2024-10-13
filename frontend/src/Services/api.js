import axios from "axios";
import { getToken } from "./authService";
// import { toasterControllerControl } from "./commonService";

export const postReq = (url, payload) => {
    return axios
        .post(url, payload)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                // toasterControllerControl("errorToaster", true, "Session Expired");
                window.location.pathname = "/";
                return { error: error };
            } else {
                return { error: error };
            }
        });
};

export const getReq = (url, payload, headers) => {
    return axios
        .get(url, {
            headers: headers || { Authorization: getToken() },
            data: payload,
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                // toasterControllerControl("errorToaster", true, "Session Expired");
                window.location.pathname = "/";
                return { error: error };
            } else {
                return { error: error };
            }
        });
};

export const postTReq = (url, payload, headers) => {
    return axios
        .post(url, payload, {
            headers: headers || { Authorization: getToken() },
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                // toasterControllerControl("errorToaster", true, "Session Expired");
                window.location.pathname = "/";
                return { error: error };
            } else {
                return { error: error };
            }
        });
};

export const delReq = (url, payload) => {
    return axios
        .delete(url, {
            header: {
                "Access-Control-Allow-Origin": "*",
            },
            data: payload,
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                // toasterControllerControl("errorToaster", true, "Session Expired");
                window.location.pathname = "/";
                return { error: error };
            } else {
                return { error: error };
            }
        });
};

export const putReq = (url, payload) => {
    return axios
        .put(url, payload, {
            headers: { Authorization: getToken() },
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                // toasterControllerControl("errorToaster", true, "Session Expired");
                window.location.pathname = "/";
                return { error: error };
            } else {
                return { error: error };
            }
        });
};

export const callAPI = async (method = "POST", url = "", data = {}, resType = "json") => {
    try {
        if (method !== "GET") {
            const response = await fetch(url, {
                method: method, // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (resType !== "json") {
                return response;
            }
            return response.json();
        } else {
            const response = await fetch(url, {
                method: method,
                mode: "no-cors",
            });
            if (resType !== "json") {
                return response;
            }
            return response.json();
        }
    } catch (error) {
        console.log(error);
        return { error: "error" };
    }
};

export const plainGetReq = (url, payload) => {
    return axios
        .get(url, {
            data: payload,
        })
        .then((response) => response)
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                // toasterControllerControl("errorToaster", true, "Session Expired");
                window.location.pathname = "/";
                return { error: error };
            } else {
                return { error: error };
            }
        });
};