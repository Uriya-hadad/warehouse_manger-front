import React, {useState} from "react";
import "./styles/App.css";
import {Login} from "./Components/Login";
import Register from "./Components/Register";
import Screen from "./Components/Screen";

type MyState = { isLogin: boolean };


class App extends React.Component<Record<string, never>, MyState> {

	constructor(props: Record<string, never>) {
		super(props);
		this.state = {isLogin: false};
	}

	registerHandler(e: any) {
		e.preventDefault();
		this.setState(prevState => ({isLogin: !prevState.isLogin}));
	}

	render() {
		const isLogin = this.state.isLogin;
		return <Screen/>;
		// <div

		// className="login-container">
		// {isLogin && <Login/>}
		// {!isLogin && <Register/>}
		// <a href="#" onClick={this.registerHandler.bind(this)}>Register</a>
		// </div>
	}
}
export default App;
