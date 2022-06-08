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
		// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJiJDEwJHBXZnNyRldOUHFaUEtpTlQ2ME9MUE94SFJRemFpR1RUNGJ5a1kubHE0TS5pOXRqSEJ1cDBhIiwicm9sZSI6Ik1hbmdlciJ9LCJpYXQiOjE2NTQ0Njc5MDUsImV4cCI6MTY1NDQ2ODAwNX0.etagiS5YJUBzUd-NRV9fKBksclVTJeKKqIQvHgHljKk";
		return <>
			{!token && <LoginRegisterScreen setToken={this.setToken.bind(this)}/>}
			{token && <Screen setToken={this.setToken.bind(this)} token={token}/>}
		</>;
	}
}

export default App;
