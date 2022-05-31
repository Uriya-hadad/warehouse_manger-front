import React, {Component, FormEvent} from "react";
import "../../styles/login.css";
import {
	request,
	gql
} from "graphql-request";
import {Button, TextField} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LoadingButton from "@mui/lab/LoadingButton";


type State = {
	isLoading: boolean,
	massage?: string
}

type props = {
	setToken: (token:string) => void
};

const query = gql`
          mutation login($username: String!
                          $password: String!){
                login(username:$username
                              password:$password)
          }
        `;

export class Login extends Component<props, State> {
	constructor(props: props) {
		super(props);
		this.state = {
			isLoading: false
		};
	}

	changeLoadingState() {
		this.setState(prevState => ({isLoading: !prevState.isLoading}));
	}


	private async fetchRequest(e: FormEvent<HTMLFormElement>) {
		const {setToken} = this.props;
		e.preventDefault();
		this.changeLoadingState();
		const username: HTMLInputElement = document.querySelector("#username")!;
		const password: HTMLInputElement = document.querySelector("#password")!;

		const data = (await request("http://localhost:3001/graphql", query, {
			username: username.value,
			password: password.value
		})).login;
		this.setState({massage: data});
		if (!data.includes("is"))
			setToken(data);
		this.changeLoadingState();
	}

	render() {
		const {massage,isLoading} = this.state;
		return <form className="login-container" onSubmit={this.fetchRequest.bind(this)}>
			<h1 className="login-title">Login</h1>
			<TextField
				placeholder="Username"
				className="login-input"
				id="username"
				color="success"
				type="text"
				variant="standard"/>

			<TextField
				color="success"
				placeholder="Password"
				className="login-input"
				id="password"
				type="password"
				variant="standard"/>
			<LoadingButton
				disableElevation
				variant="contained"
				id="login-submit"
				loading={isLoading}
				color="success"
				size="large"
				endIcon={<LoginIcon/>}
				type="submit">Sign
				in
			</LoadingButton>
			{massage && <h3>{massage}</h3>}
		</form>;
	}

}