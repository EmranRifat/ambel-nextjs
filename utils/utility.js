import crypto from "crypto";
export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties,
	};
};

export const getDate = (date) => {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const dateObject = new Date(date);
	const time = dateObject.getTime();
	const current = new Date().getTime();

	const seconds = Math.floor((current - time) / 1000);
	const minutes = Math.floor((current - time) / 1000 / 60);
	const hours = Math.floor((current - time) / (1000 * 60 * 60));
	const days = Math.floor(time / (1000 * 60 * 60 * 24));
	if (seconds < 3) return "Just now";
	if (seconds < 60) return seconds + " seconds ago";
	if (minutes < 60) return minutes + " minutes ago";
	if (hours < 24) return hours + " hours ago";
	if (days < 4) return days + " days ago";

	return (
		monthNames[dateObject.getMonth()].substr(0, 3) +
		" " +
		dateObject.getDate() +
		", " +
		dateObject.getFullYear()
	);
};

export const getTimeDate = (date) => {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const dateObject = new Date(date);
	const time = dateObject.getTime();
	const current = new Date().getTime();

	const seconds = Math.floor((current - time) / 1000);
	const minutes = Math.floor((current - time) / 1000 / 60);
	const hours = Math.floor((current - time) / (1000 * 60 * 60));
	const days = Math.floor(time / (1000 * 60 * 60 * 24));
	if (seconds < 3) return "Just now";
	if (minutes < 60) return getTime(dateObject);
	if (hours < 24) return getTime(dateObject);
	if (days < 4) return days + " days ago";

	return (
		monthNames[dateObject.getMonth()]?.substr(0, 3) +
		" " +
		dateObject.getDate() +
		", " +
		dateObject.getFullYear()
	);
};

export const getDateVal = (date) => {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const dateObject = new Date(date);

	return (
		monthNames[dateObject.getMonth()].substr(0, 3) +
		" " +
		dateObject.getDate() +
		", " +
		dateObject.getFullYear()
	);
};

export const getMonth = (date) => {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const dateObject = new Date(date);
	return monthNames[dateObject.getMonth()].substr(0, 3);
};

export const getDateValue = (date) => {
	const dateObject = new Date(date);
	return dateObject.getDate();
};

export const setDateValue = (date, toSetDate) => {
	const dateObject = new Date(date);
	return dateObject.setDate(toSetDate);
};

export const getTime = (date) => {
	const dateObject = new Date(date);
	return dateObject.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
};

export const getSplitText = (name, minLength) => {
	const splittedName = /\s/g.test(name)
		? name.split(" ")[0] + " " + name.split(" ")[1]
		: name;

	return splittedName.length > minLength
		? splittedName.substr(0, minLength)
		: splittedName;
};

export const getBigToSmallText = (text, minLength) => {
	return text.length > minLength ? text.substr(0, minLength) + "..." : text;
};

export const getFileNameText = (text, minLength) => {
	return text.length > minLength
		? text.substr(0, minLength) + "..." + text.split(".").pop()
		: text;
};

export const bytesToSize = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

export const returnOnlyDigit = (value) =>
	value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");

export const toQueryString = (obj) =>
	"?".concat(
		Object.keys(obj)
			.map((e) => `${encodeURIComponent(e)}=${encodeURIComponent(obj[e])}`)
			.join("&")
	);

export const objMatch = (obj1, obj2) => {
	const keys1 = Object.keys(obj1);
	// const keys2 = Object.keys(obj2);
	for (let key of keys1) {
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}
	return true;
};

export const decrypt = function (text) {
  var decipher = crypto.createDecipher(
    "aes192",
    process.env.NEXT_PUBLIC_PASSWORD_FOR_ENCRYPT_DECRYPT
  );
  var dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
};
