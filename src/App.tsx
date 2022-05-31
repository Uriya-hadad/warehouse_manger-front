import React, {MouseEventHandler, useState} from "react";
import Screen from "./Components/mainScreens/Screen";
import LoginRegisterScreen from "./Components/mainScreens/LoginRegisterScreen";

type MyState = { token?: string };

type props = {
	setToken: (token:string) => void
};


class App extends React.Component<Record<string, never>, MyState> {

	constructor(props: Record<string, never>) {
		super(props);
		this.state={
			token:undefined
		};
	}

	private setToken(token: string) {
		this.setState({token});
	}

	render() {
		const {token} = this.state;
		// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyMiwidXNlcm5hbWUiOiJ0ZXN0MSIsInBhc3N3b3JkIjoiJDJiJDEwJFFKVC5XUnEzMkQxRHVJUndMdnBTMy42aDRFaGd2NmxNSXA4UEdrd2d1L3ZJNGh3UkRHY3hHIiwicm9sZSI6ImNsaWVudCJ9LCJpYXQiOjE2NTQwMjI3MjcsImV4cCI6MTY1NDAyMjgyN30.W2hkcTpslF9joVDAVBSJ-iqMeVk7AW-1YEeeYcsMcPU";
		return <>
			{!token && <LoginRegisterScreen setToken={this.setToken.bind(this)}/>}
			{token && <Screen token={token}/>}
		</>;
	}
}

export default App;
