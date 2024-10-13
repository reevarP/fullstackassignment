import React, { useState } from "react";
import styles from "./loginPage.module.css";
import { postReq } from "../../Services/api";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { baseUrl } from "../../Services/constants";
import { toasterControl } from "../../Services/commons";

const LoginPage = () => {
	const navigateTo = useNavigate();
	const [inputData, setInputData] = useState({
		email: "",
		password: "",
	});
	const handleInput = (event) => {
		const { name, value } = event.target;
		setInputData((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const [otpText, setOtpText] = useState("");
	const [savedUserId, setSavedUserId] = useState("");
	const [otpDialog, setOtpDialog] = useState(false);
	const handleClose = () => {
		setOtpText("");
		setOtpDialog(false);
	};

	const handleLogin = async () => {
		const res = await postReq(`${baseUrl}/api/auth/login`, inputData);
		if (res && !res.error) {
			if (res.data.token) {
				localStorage.setItem("token", res.data.token);
				navigateTo("/profile");
			} else {
				if (res.data.userId) {
					setSavedUserId(res.data.userId);
					setOtpDialog(true);
				}
			}
		} else {
			console.log(res.error);
			if (res.error.response.data.errors) {
				toasterControl("errorToaster", true, res.error.response.data.errors[0].msg);
			} else {
				toasterControl("errorToaster", true, res.error.response.data.message);
			}
		}
	};

	const handleOtpSubmit = async () => {
		const res = await postReq(`${baseUrl}/api/auth/verify-otp`, {
			userId: savedUserId,
			otp: otpText,
		});
		if (res && !res.error) {
			if (res.data.token) {
				localStorage.setItem("token", res.data.token);
				navigateTo("/profile");
			}
		} else {
			console.log(res.error);
		}
	};
	return (
		<>
			<Dialog fullWidth open={otpDialog} onClose={handleClose}>
				<DialogTitle>Enter OTP</DialogTitle>
				<DialogContent>
					<div style={{ paddingTop: "0.5rem" }}>
						<TextField size="small" variant="outlined" fullWidth value={otpText} onChange={(event) => setOtpText(event.target.value)} />
						<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "0.5rem" }}>
							<Button variant="contained" style={{ backgroundColor: "#bdbdbd", marginRight: "0.5rem" }} onClick={handleClose}>
								Cancel
							</Button>
							<Button variant="contained" color="primary" onClick={handleOtpSubmit}>
								Submit
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
			<div className={styles.container}>
				<div className={styles.registerBox}>
					<div className={styles.boxHeading}>Login</div>
					<div style={{ width: "100%", padding: "0 2rem", marginBottom: "0.5rem" }}>
						<TextField size="small" fullWidth label="Email" variant="filled" name="email" value={inputData.email} onChange={handleInput} />
					</div>
					<div style={{ width: "100%", padding: "0 2rem" }}>
						<TextField type="password" size="small" fullWidth label="Password" variant="filled" name="password" value={inputData.password} onChange={handleInput} />
					</div>
					<div style={{ width: "100%", padding: "0 2rem", marginTop: "1rem" }}>
						<Button variant="contained" fullWidth onClick={handleLogin}>
							Login
						</Button>
					</div>
					<div className={styles.bottomText}>
						<span>Don't have an account?</span>
						<span className={styles.registerLink} onClick={() => navigateTo("/")}>
							Register
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
