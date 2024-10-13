import React, { useState } from "react";
import styles from "./registerPage.module.css";
import { postReq } from "../../Services/api";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { toasterControl } from "../../Services/commons";

const RegisterPage = () => {
	const navigateTo = useNavigate();
	const [inputData, setInputData] = useState({
		username: "",
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
	const handleRegister = async () => {
		const res = await postReq("http://localhost:3001/api/auth/register", inputData);
		if (res && !res.error) {
			localStorage.setItem("token", res.data.token);
			toasterControl("successToaster", true, "User Registered Successfully");
			navigateTo("/profile");
		} else {
			console.log(res.error);
			console.log(res.error);
			if (res.error.response.data.errors) {
				toasterControl("errorToaster", true, res.error.response.data.errors[0].msg);
			} else {
				toasterControl("errorToaster", true, res.error.response.data.message);
			}
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.registerBox}>
				<div className={styles.boxHeading}>Register</div>
				<div style={{ width: "100%", padding: "0 2rem", marginBottom: "0.5rem" }}>
					<TextField size="small" fullWidth label="Username" variant="filled" name="username" value={inputData.username} onChange={handleInput} />
				</div>
				<div style={{ width: "100%", padding: "0 2rem", marginBottom: "0.5rem" }}>
					<TextField size="small" fullWidth label="Email" variant="filled" name="email" value={inputData.email} onChange={handleInput} />
				</div>
				<div style={{ width: "100%", padding: "0 2rem", marginBottom: "0.5rem" }}>
					<TextField size="small" fullWidth label="Password" variant="filled" name="password" value={inputData.password} onChange={handleInput} />
				</div>
				<div style={{ width: "100%", padding: "0 2rem", marginTop: "1rem" }}>
					<Button variant="contained" fullWidth onClick={handleRegister}>
						Register
					</Button>
				</div>
				<div className={styles.bottomText}>
					<span>Already have an account?</span>
					<span className={styles.registerLink} onClick={() => navigateTo("/login")}>
						Login
					</span>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
