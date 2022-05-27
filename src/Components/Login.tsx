import React,{Component} from "react";
import "../styles/login.css";
import {
	request,
	gql
} from "graphql-request";
import {Button} from "@mui/material";
import SendIcon
	from "@mui/icons-material/Send";
import ShoppingCartIcon
	from "@mui/icons-material/ShoppingCart";


function change_color(b: boolean) {
	const button: HTMLButtonElement = document.querySelector("#login-submit")!;
	const button1: HTMLButtonElement = document.querySelector("#login-client")!;
	if (!b) {
		button.style.backgroundColor = "firebrick";
		button1.style.backgroundColor = "firebrick";
	} else {
		button.style.backgroundColor = "forestgreen";
		button1.style.backgroundColor = "forestgreen";
	}

}
type Props = {}

type State = {
    timeRemainingInSeconds: number;
}

export class Login extends Component<Props, State>{
	constructor(props: Props) {
		super(props);
		this.submitHandler.bind(this);
		this.clientHandler.bind(this);
	}

	submitHandler() {
		const query = gql`
          mutation login($username: String!
                          $password: String!){
                login(username:$username
                              password:$password)
          }
        `;

		const username: HTMLInputElement = document.querySelector("#username")!;
		const password: HTMLInputElement = document.querySelector("#password")!;
		request("http://localhost:3001/graphql", query, {
			username: username.value,
			password: password.value
		}).then((data) => {

			change_color(true);
		}).catch(e => {
			console.log(e);
			change_color(false);
		});

	}

	clientHandler() {
		alert("clientHandler");
	}

	render() {
		return <form onSubmit={this.submitHandler}>
			<h2>Login</h2>
			<div
				className="login-inner-container">
				<label
					className="login-label username"
					htmlFor="username">Username: </label>
				<input
					className="login-input"
					id="username"
					type="text"/>
			</div>
			<div
				className="login-inner-container">
				<label
					className="login-label password"
					htmlFor="password">Password: </label>
				<input
					autoComplete={"true"}
					className="login-input"
					id="password"
					type="password"/>
			</div>
			<div
				className="login-buttons">
				<Button
					disableElevation
					variant="contained"
					onClick={this.clientHandler}
					id="login-client"
					type="submit"
					endIcon={
						<ShoppingCartIcon/>}>Client
				</Button>
				<Button
					disableElevation
					variant="contained"
					id="login-submit"
					endIcon={
						<SendIcon/>}
					type="submit">Sign
                    in
				</Button>
			</div>
		</form>;
	}

}