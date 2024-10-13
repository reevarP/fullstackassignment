export const getLoginId = () => {
    return localStorage.getItem("userId");
};

export const getToken = () => {
    if (localStorage.getItem("token")) {
        return `${localStorage.getItem("token")}`;
    } else {
        return null;
    }
};
