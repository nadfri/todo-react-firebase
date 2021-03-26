import React, { useState, useRef, useEffect } from "react";
import classes from "./App.module.css";
import Task from "../../Components/Task";
import axios from "../../axios-firabase";

function App() {
	/*State*/
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState("");

	/*ref*/
	const inputRef = useRef(null);

	/*useEffect*/
	useEffect(() => {
		fetchDB();
	}, []);

	/*Fonctions*/

	/*Recuperation de la base de données*/
	const fetchDB = () => {
		inputRef.current.focus();
		axios
			.get("/tasks.json")
			.then((res) => {
				const tasksFetch = [];
				for (let id in res.data) tasksFetch.push({ ...res.data[id], id });
				tasksFetch.sort((a, b) => a.done - b.done); //tri du tableau
				setTasks(tasksFetch);
			})
			.catch((error) => console.log(error));
	};

	/*Ajout d'une tache*/
	const addTask = (e) => {
		e.preventDefault();
		//setTasks([...tasks, { content: input, done: false }]);
		const newTask = {
			content: input,
			done: false,
		};

		axios.post("/tasks.json", newTask).then(()=>fetchDB()); //update tasks
		setInput("");
	};

	/*Suppression d'une tache*/
	const removeHandler = (index) => {
		const copy = [...tasks];

		axios
			.delete("/tasks/" + copy[index].id + ".json")
			.then(()=>fetchDB())
			.catch((error) => console.log(error));
	};

	/*Gestion de la checkbox*/
	const checkHandler = (index) => {
		const copy = [...tasks];
		copy[index].done = !copy[index].done;

		axios
			.put("/tasks/" + copy[index].id + ".json", copy[index])
			.then(() => fetchDB())
			.catch((error) => console.log(error));
	};

	/*Gestion de l'input*/
	const inputHandler = (e) => setInput(e.target.value);

	/*JSX*/

	return (
		<div className={classes.App}>
			<header>
				<span>Ma Todo onLine</span>
			</header>

			<div className={classes.add}>
				<form onSubmit={(e) => addTask(e)}>
					<input
						type="text"
						placeholder="Que souhaitez-vous ajouter ?"
						value={input}
						onChange={(e) => inputHandler(e)}
						required
						ref={inputRef}
					/>
					<button type="submit">Ajouter</button>
				</form>
			</div>

			{tasks.map((task, index) => (
				<Task
					content={task.content}
					key={index}
					done={task.done}
					removeHandler={() => removeHandler(index)}
					checkHandler={() => checkHandler(index)}
				/>
			))}
		</div>
	);
}

export default App;
