import React, {Component} from "react";
import "../../styles/Screen.css";
import jwtDecode from "jwt-decode";
import {
	GetContent,
	GetTiles,
	ShowData,
	ShowError
} from "../../util/ScreenFunctions";
import LoadingButton from "@mui/lab/LoadingButton";
import {ThemeProvider} from "@mui/material";
import {GraphQLClient} from "graphql-request";
import {createGraphqlClient} from "../../util/function";

export interface Product {
	name: string,
	quantity: number,
	imgSrc: string,
	numberOfSales: number
}

export type messagesInterface = {
	message?: string,
	error?: string
}

type State = {
	graphqlClient: GraphQLClient,
	role: string,
	username: string,
	data?: Array<Product>,
	select: selection.search,
	messages?: messagesInterface
}
type tokenType = {
	user: {
		id: number,
		username: string,
		password: string,
		role: string
	}
}

type Props = {
	token: string,
	setToken: (token: string | undefined) => void
}

export enum selection {
	search,
	getList,
	addAdjDelProduct,
	roles,
	insertASell
}

export default class Screen extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		const {token} = this.props;
		const {user: {role, username}} = (jwtDecode(token) as tokenType);
		const graphqlClient = createGraphqlClient(token);
		this.state = {
			graphqlClient,
			username,
			role,
			data: undefined,
			select: selection.search,
		};
	}

	clearErrorAndData() {
		(document.querySelector(".data-container") as HTMLDivElement)!.style.display = "none";
		this.setState({messages: undefined, data: undefined});
	}

	changeStateData(data?: Array<Product>) {
		this.setState({data});
		(document.querySelector(".data-container") as HTMLDivElement)!.style.display = "flex";
	}

	showMessages(messages: messagesInterface) {
		if (messages)
			this.setState({messages});
	}

	private logOut() {
		this.props.setToken(undefined);
	}

	selectHandlerAndHideData(e: React.MouseEvent<HTMLButtonElement>) {
		(document.querySelector(".data-container") as HTMLDivElement)!.style.display = "none";
		this.setState({messages: undefined, data: undefined});
		this.setState({select: parseInt((e.target as HTMLButtonElement).value)});
	}

	render() {
		const {data, messages,role, username,graphqlClient} = this.state;
		return <div className="ScreensContainer">
			<div className={"nameTitleContainer"}>
				<h1 className={"nameTitle"}>Hi {username}!</h1>
				<LoadingButton
					onClick={this.logOut.bind(this)}
					sx={{backgroundColor: "#ff9e37", "&:hover": {backgroundColor: "#f8ac5b"}}}
					variant="contained">
					LogOUt
				</LoadingButton>
			</div>
			<GetTiles role={role}  handler={this.selectHandlerAndHideData.bind(this)}/>
			<GetContent
				select={this.state.select}
				changeFunction={this.changeStateData.bind(this)}
				showMessages={this.showMessages.bind(this)}
				graphqlClient={graphqlClient}
				clear={this.clearErrorAndData.bind(this)}/>
			<div className={"data-container"}>
				{data && <ShowData data={data}/>}
				{messages && <ShowError messages={messages}/>}
			</div>
		</div>;


	}
}
