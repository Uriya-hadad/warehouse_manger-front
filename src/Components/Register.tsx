import React,{ Component } from "react";
import {Button} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SendIcon from "@mui/icons-material/Send";
import {gql, request} from "graphql-request";

type MyState = { isLogin: boolean };

class Register extends Component<Record<string, never>, MyState> {
	submitHandler() {
		const query = gql`
          mutation register($username: String!
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

		}).catch(e => {
			console.log(e);
		});

	}

	clientHandler() {
		alert("clientHandler");
	}


	render() {
		return <form onSubmit={this.submitHandler}>
			<h2>Register</h2>
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
                    up
				</Button>
			</div>
		</form>;
	}
}

export default Register;