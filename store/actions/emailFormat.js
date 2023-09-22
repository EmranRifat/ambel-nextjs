import axios from "../../utils/axios";
import cookie from "js-cookie";
import {
	EMAIL_FORMAT_GET_FAIL,
	EMAIL_FORMAT_GET_SUCCESS,
	EMAIL_FORMAT_LOADING,
	EMAIL_FORMAT_POST_FAIL,
	EMAIL_FORMAT_POST_SUCCESS,
} from "./types";


export const onCancelAction = () => async (dispatch) => {
	dispatch({ type: EMAIL_FORMAT_POST_FAIL });
};

export const getEmailFormat = () => async (dispatch) => {
	dispatch({ type: EMAIL_FORMAT_LOADING });
	const res = await axios.get("emailFormat", {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	if (res.data.status === "success") {
		dispatch({ type: EMAIL_FORMAT_GET_SUCCESS, payload: res.data.data });
	} else {
		dispatch({ type: EMAIL_FORMAT_GET_FAIL });
	}
};

export const updateEmailFormat =
	(props) => async (dispatch) => {
		const { emailFormat, formatId, setSaveEmail, saveEmail } = props || {}
		dispatch({ type: EMAIL_FORMAT_LOADING });

		const res = formatId
			? await axios.patch(`/emailFormat/${formatId}`, emailFormat, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			})
			: await axios.post(`/emailFormat`, emailFormat, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});
		if (res.data.status === "success") {
			// console.log(res.data.data);
			dispatch({
				type: EMAIL_FORMAT_POST_SUCCESS,
				payload: {
					fromat: res.data.data.doc,
				},
			});
			setSaveEmail(!saveEmail)
		} else {
			dispatch({ type: EMAIL_FORMAT_POST_FAIL });
			setSaveEmail(!saveEmail)
		}
		setSaveEmail(!saveEmail)
	};


export const sendEmail = (data) => async (dispatch) => {

	const { selectedEmailValue, setSelectedEmailSuccess, props, emailFormats, selectedFormat, setEmailSendSuccess, setEmailError, setEmailConfirmation, name, staffEmail } = data || {}

	setSelectedEmailSuccess(true)

	try {
		const res = await axios.post(`/emailFormat/sendEmail?sendTo=${selectedEmailValue}&organizationId=${props?.info?.business?._id}&staffEmail=${staffEmail}`, { selectedFormat, props }, {
			withCredentials: true,
			headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
		})
		if (res.status === 200 || res.status === 201) {
			selectedFormat.name = ''
			selectedFormat.body = ''
			selectedFormat.subject = ''

			setEmailSendSuccess('Email sent successfully')
		}
	} catch (error) {
		setEmailError(`Can't send email`)
	}
	setSelectedEmailSuccess(false)
	setEmailConfirmation(false)
}
