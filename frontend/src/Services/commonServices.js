import { saveProfileData } from "../Redux/Slices/noPersistSlice";
import store from "../Redux/store";
import { getReq } from "./api";
import { baseUrl } from "./constants";

export const getProfileData = async () => {
    const res = await getReq(`${baseUrl}/api/user/profile`);
    if (res && !res.error) {
        store.dispatch(saveProfileData(res.data));
    } else {
        console.log(res.error);
    }
};
