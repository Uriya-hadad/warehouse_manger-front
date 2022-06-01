import React, {Component, FormEvent} from "react";
import "../../styles/login.css";
import {gql, GraphQLClient
} from "graphql-request";
import {TextField} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LoadingButton from "@mui/lab/LoadingButton";
import {jsonParser} from "../../util/function";


type State = {
	isLoading: boolean,
	massage?: string
}

type props = {
	setToken: (token: string | undefined) => void,
	graphqlClient:GraphQLClient
};

const loginQuery = gql`
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
		e.preventDefault();
		this.setState({massage: undefined});
		const {setToken,graphqlClient} = this.props;
		this.changeLoadingState();
		const username: HTMLInputElement = document.querySelector("#username")!;
		const password: HTMLInputElement = document.querySelector("#password")!;
		graphqlClient.setHeader("QueryName","login");
		try {
			const data = (await graphqlClient.request( loginQuery, {
				username: username.value,
				password: password.value
			})).login;
			setToken(data);
		} catch (e) {
			const error = jsonParser(e as string).response.errors[0].message;
			this.setState({massage: error});
		} finally {
			this.changeLoadingState();
		}
	}

	render() {
		const {massage, isLoading} = this.state;
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