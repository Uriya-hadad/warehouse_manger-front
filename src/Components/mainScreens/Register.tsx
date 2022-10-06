import React, {ChangeEvent, Component, FormEvent} from "react";
import {TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {gql, GraphQLClient} from "graphql-request";
import "../../styles/register.css";
import LoadingButton from "@mui/lab/LoadingButton";
import {jsonParser} from "../../util/function";


type MyState = {
	isLoading: boolean,
	password: string,
	repeatPassword: string,
	massage?: string
};

type props = {
	changeState: () => void,
	graphqlClient:GraphQLClient
}

const registrationQuery = gql`
          mutation register($username: String!, $email: String!, $password: String!){
                register(username:$username
                			  email:$email
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
		const {changeState,graphqlClient} = this.props;
		e.preventDefault();
		const {password, repeatPassword} = this.state;
		const username: HTMLInputElement = document.querySelector("#username")!;
		const email: HTMLInputElement = document.querySelector("#email")!;
		if (repeatPassword !== password) {
			this.changeLoadingState();
			return this.setState({massage: "Enter the same password"});
		}
		try {
			const data = (await graphqlClient.request(registrationQuery, {
				username: username.value,
				email: email.value,
				password: password
			})).register;
			this.setState({massage: data});
			setTimeout(changeState, 700);
		} catch (e) {
			const error = jsonParser(e as string).response.errors[0].message;
			this.setState({massage: error});
		} finally {
			this.changeLoadingState();
		}
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
				placeholder="Email"
				className="register-input"
				id="email"
				color="success"
				type="email"
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