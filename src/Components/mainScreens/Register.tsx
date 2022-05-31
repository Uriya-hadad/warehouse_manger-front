import React, {ChangeEvent, Component, FormEvent, FormEventHandler} from "react";
import {Button, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {gql, request} from "graphql-request";
import "../../styles/register.css";
import LoadingButton from "@mui/lab/LoadingButton";


type MyState = {
	isLoading: boolean,
	password: string,
	repeatPassword: string,
	massage?: string
};

type props = {
	changeState: () => void
}

const registrationQuery = gql`
          mutation register($username: String!,$password: String!){
                register(username:$username
                              password:$password)
          }
        `;

class Register extends Component<props, MyState> {
	constructor(props: props) {
		super(props);
		this.state = {
			isLoading: false,
			password: "",
			repeatPassword: "",
		};
	}

	changeLoadingState() {
		this.setState(prevState => ({isLoading: !prevState.isLoading}));
	}

	private async submitHandler(e: FormEvent<HTMLFormElement>) {
		this.changeLoadingState();
		const changeState = this.props.changeState;
		e.preventDefault();
		const {password, repeatPassword} = this.state;
		const username: HTMLInputElement = document.querySelector("#username")!;
		if (repeatPassword !== password) {
			this.changeLoadingState();
			return this.setState({massage: "Enter the same password"});
		}
		const data = (await request("http://localhost:3001/graphql", registrationQuery, {
			username: username.value,
			password: password
		})).register;
		// const data = "user created successfully!";
		this.setState({massage: data});
		this.changeLoadingState();
		if (data.includes("successfully"))
			setTimeout(changeState, 2000);

	}

	private passwordUpdate(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const password = event.target.value;
		this.setState({password, massage: undefined});
	}

	private repeatPasswordUpdate(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const repeatPassword = event.target.value;
		this.setState({repeatPassword, massage: undefined});
	}

	render() {
		const {password, repeatPassword, massage, isLoading} = this.state;
		return <form className="register-container" onSubmit={this.submitHandler.bind(this)}>
			<h1 className="register-title">Register</h1>
			<TextField
				required
				placeholder="Username"
				className="register-input"
				id="username"
				color="success"
				type="text"
				variant="standard"/>
			<TextField
				required
				size="medium"
				color="success"
				onChange={this.passwordUpdate.bind(this)}
				placeholder="Password"
				className="register-input"
				id="password"
				type="password"
				autoComplete={"on"}
				variant="standard"/>
			<TextField
				required
				color="success"
				placeholder="Repeat the Password"
				className="register-input"
				id="RepeatPassword"
				onChange={this.repeatPasswordUpdate.bind(this)}
				error={password !== repeatPassword}
				type="password"
				autoComplete={"on"}
				variant="standard"/>
			<LoadingButton
				disableElevation
				variant="contained"
				id="register-submit"
				loading={isLoading}
				color="success"
				size="large"
				endIcon={<AddIcon/>}
				type="submit">Sign
				up
			</LoadingButton>
			{massage && <h3>{massage}</h3>}
		</form>;
	}
}

export default Register;