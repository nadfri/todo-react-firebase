import React from "react";
import spinner from "./spinner.svg";
import classes from "./Spinner.module.css";

function Spinner(props) {
	return (
		<div className={classes.spinner}>
			<img src={spinner} alt="loading..." />
		</div>
	);
}

export default Spinner;
