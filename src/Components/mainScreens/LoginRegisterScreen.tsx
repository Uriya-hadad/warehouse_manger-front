import { GraphQLClient } from "graphql-request";
import React from "react";
import "../../styles/loginRegisterScreen.css";
import {Login} from "./Login";
import Register from "./Register";
import {createGraphqlClient} from "../../util/function";

type MyState = { isLogin: boolean,graphqlClient:GraphQLClient};

type props = {
	setToken: (token: string | undefined) => void

}

class LoginRegisterScreen extends React.Component<props, MyState> {

	constructor(props: props) {
		const graphqlClient = createGraphqlClient();
		super(props);
		this.state = {isLogin: true,graphqlClient};
	}

	private registerHandler() {
		this.setState(prevState => ({isLogin: !prevState.isLogin}));
	}

	render() {
		const {isLogin,graphqlClient} = this.state;
		const {setToken} = this.props;
		const currentForm = isLogin ? "Register" : "Login";
		return <div className="app-container">
			{isLogin  && <Login graphqlClient={graphqlClient} setToken={setToken}/>}
			{!isLogin  && < Register graphqlClient={graphqlClient} changeState={this.registerHandler.bind(this)}/>}
			<a
				href="#"
				id="linkText"
				onClick={this.registerHandler.bind(this)}>{currentForm}</a>
		</div>;
	}
}

export default LoginRegisterScreen;
