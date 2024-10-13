import React from "react";
import styles from "./sessionTable.module.css";
import { convertISOToCustomFormat } from "../../../Services/commons";

const SessionTable = ({ tableHeads, tableData }) => {
	return (
		<>
			<div className={styles.headContainer}>
				{tableHeads.map((curElem, index) => {
					return (
						<div style={{ width: `${curElem.width}%` }} className={`${styles.eachHead} ${index < tableHeads.length - 1 ? styles.borderRight : ""}`}>
							{curElem.label}
						</div>
					);
				})}
			</div>
			{tableData && tableData.map((curElem, ind) => {
				return (
					<div className={styles.eachRow}>
						{tableHeads.map((cur, index) => {
							return (
								<div style={{ width: `${cur.width}%` }} className={`${styles.eachCell} ${index < tableHeads.length - 1 ? styles.borderRight : ""}`}>
									{cur.identifier === "loginTimestamp" ? convertISOToCustomFormat(curElem["loginTimestamp"]) : curElem[cur.identifier]}
								</div>
							);
						})}
					</div>
				);
			})}
		</>
	);
};

export default SessionTable;
