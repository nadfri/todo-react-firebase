import React from "react";
import Checked from "./svg/Checked";
import Cross from "./svg/Cross";
import NoCheck from "./svg/NoCheck";
import classes from "./Task.module.css";

function Task({ done, content, removeHandler, checkHandler }) {
	const message = done ? (
		<>
			<Checked />
			<strike>{content}</strike>
		</>
	) : (
		<>
			<NoCheck />
			{content}
		</>
	);

	return (
		<div className={classes.task}>
			<div className={classes.content} onClick={checkHandler}>
				{message}
			</div>
			<Cross removeHandler={removeHandler} />
		</div>
	);
}

export default Task;
