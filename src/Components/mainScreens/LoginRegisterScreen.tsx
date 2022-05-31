import React from "react";
import "../../styles/loginRegisterScreen.css";
import {Login} from "./Login";
import Register from "./Register";

type MyState = { isLogin: boolean };

type props = {
	setToken: (token: string) => void

}

class LoginRegisterScreen extends React.Component<props, MyState> {

	constructor(props: props) {
		super(props);
		this.state = {isLogin: true};
	}

	private registerHandler() {
		this.setState(prevState => ({isLogin: !prevState.isLogin}));
	}

	render() {
		const {isLogin} = this.state;
		const {setToken} = this.props;
		const currentForm = isLogin ? "Register" : "Login";
		return <div className="app-container">
			{isLogin  && <Login setToken={setToken}/>}
			{!isLogin  && < Register changeState={this.registerHandler.bind(this)}/>}
			<a
				href="#"
				id="linkText"
				onClick={this.registerHandler.bind(this)}>{currentForm}</a>
		</div>;
	}
}

export default LoginRegisterScreen;
