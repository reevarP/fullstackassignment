import React, { useEffect, useState } from "react";
import styles from "./profilePage.module.css";
import { getProfileData } from "../../Services/commonServices";
import { useSelector } from "react-redux";
import { Button, CircularProgress, Switch } from "@mui/material";
import SessionTable from "./SessionTable/SessionTable";
import { postTReq, putReq } from "../../Services/api";
import { baseUrl } from "../../Services/constants";
import { toasterControl } from "../../Services/commons";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
	const navigateTo = useNavigate();
	const { profileData } = useSelector((state) => state.nopersist);

	const tableHeads = [
		{
			label: "Device Type",
			identifier: "deviceType",
			width: `${100 / 4}`,
		},
		{
			label: "Browser",
			identifier: "browser",
			width: `${100 / 4}`,
		},
		{
			label: "Location",
			identifier: "location",
			width: `${100 / 4}`,
		},
		{
			label: "Login Time",
			identifier: "loginTimestamp",
			width: `${100 / 4}`,
		},
	];

	const [loading, setLoading] = useState(false);
	const handleTwoFactorUpdate = async (event) => {
		setLoading(true);
		const { checked } = event.target;
		const res = await putReq(`${baseUrl}/api/user/profile`, {
			isTwoFactorEnabled: checked,
		});
		if (res && !res.error) {
			getProfileData();
			setLoading(false);
			toasterControl("successToaster", true, "Two Factor Authentication Status has been updated");
		} else {
			console.log(res.error);
			setLoading(false);
			toasterControl("errorToaster", true, "An error occured");
		}
	};

	const logout = async () => {
		const res = await postTReq(`${baseUrl}/api/auth/logout-session`);
		if (res && !res.error) {
			navigateTo("/login");
		} else {
			console.log(res.error);
			toasterControl("errorToaster", true, "An error occured while logging out");
		}
	};

	useEffect(() => {
		getProfileData();
	}, []);
	return (
		<div className={styles.container}>
			<div className={styles.dataBox}>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<div className={styles.boxHead} style={{ marginBottom: "1rem" }}>
						{`${profileData && profileData.username}'s Profile Details`}
					</div>
					<Button variant="contained" color="error" onClick={logout}>
						Logout
					</Button>
				</div>
				<div style={{ display: "flex", alignItems: "center" }}>
					<div className={styles.eachSection}>
						<div className={styles.sectionHead}>User Name</div>
						<div className={styles.sectionValue}>{profileData && profileData.username}</div>
					</div>
					<div className={styles.eachSection}>
						<div className={styles.sectionHead}>Email</div>
						<div className={styles.sectionValue}>{profileData && profileData.email}</div>
					</div>
				</div>
				<div className={styles.switchBox} style={{ marginTop: "0.5rem" }}>
					<div className={styles.sectionHead} style={{ marginRight: "1rem" }}>
						Two Factor Authentication
					</div>
					<Switch size="small" checked={profileData && profileData.isTwoFactorEnabled} onChange={handleTwoFactorUpdate} />
					{loading && <CircularProgress size={12} />}
				</div>
				<div style={{ marginTop: "1rem" }} className={styles.tableBox}>
					{profileData && <SessionTable tableHeads={tableHeads} tableData={profileData.sessions} />}
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
