import { toasterController } from "../Redux/Slices/toasterSlice";
import store from "../Redux/store";

export const toasterControl = (name, state, message = "") => {
	store.dispatch(toasterController({ toaster: name, state: state, message: message }));
};

export const convertISOToCustomFormat = (isoString) => {
	const date = new Date(isoString);

	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
	const year = date.getFullYear();

	let hours = date.getHours();
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12;
	hours = hours ? hours : 12; // If hour is 0, set to 12

	const formattedTime = `${day}-${month}-${year} at ${hours}:${minutes} ${ampm}`;
	return formattedTime;
};
