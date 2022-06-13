import React from "react";
import Screen from "./Components/mainScreens/Screen";
import LoginRegisterScreen from "./Components/mainScreens/LoginRegisterScreen";

type MyState = { token?: string };
class App extends React.Component<Record<string, never>, MyState> {

	constructor(props: Record<string, never>) {
		super(props);
		this.state={
			token:undefined
		};
	}

	private setToken(token: string | undefined) {
		this.setState({token});
	}

	render() {
		const {token} = this.state;
		return <>
			{!token && <LoginRegisterScreen setToken={this.setToken.bind(this)}/>}
			{token && <Screen setToken={this.setToken.bind(this)} token={token}/>}
		</>;
	}
}

export default App;
