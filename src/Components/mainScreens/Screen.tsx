import React, {Component} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import "../../styles/Screen.css";
import GetProducts from "../Inputs/GetProducts";
import SellInput from "../Inputs/SellInput";
import SellingInfo from "../Inputs/SellingInfo";
import ProductModifying from "../Inputs/ProductModifying";
import ChangeRoles from "../Inputs/ChangeRoles";
import jwtDecode from "jwt-decode";

export interface Product {
	name: string,
	quantity: number,
	imgSrc: string,
	numberOfSales: number
}

export interface messagesInterface{
	message?: string,
	error?: string
}

type State = {
	isClicked: boolean,
	data?: Array<Product>,
	select: selection.search,
	messages?: messagesInterface
}

type Props={
	token:string
}

enum selection {
	search,
	getList,
	addAdjDelProduct,
	roles,
	insertASell
}

function ShowError(props: { messages: messagesInterface }) {
	(document.querySelector(".data-container") as HTMLDivElement)!.style.display = "flex";
	const {message,error} = props.messages;
	if (error)
		return <p className="message error">{error}</p>;
	else
		return <p className="message">{message}</p>;
}

function ShowData(props: { data: Array<Product> }) {
	const data = props.data;
	return <>
		{data.map((item: Product, key) => {
			const {name, imgSrc, quantity, numberOfSales} = item;
			return<div key={key} className={"inner-data-container"}>
				<img src={imgSrc} alt="image"/>
				<h1>{name}</h1>
				<h1>quantity: {quantity}</h1>
				<h1>sales: {numberOfSales}</h1>
			</div>;
		})}
	</>;
}

function GetContent(props: { select: selection, clear: () => void, showMessages: (messages: messagesInterface) => void, changeFunction: (data: Array<Product>) => void }) {
	const {select, changeFunction, showMessages, clear} = props;
	switch (select) {
	case selection.search:
		return <GetProducts changeFunction={changeFunction} showMessages={showMessages} clearData={clear}/>;
	case selection.getList:
		return <SellingInfo changeFunction={changeFunction} showMessages={showMessages} clearData={clear}/>;
	case selection.addAdjDelProduct:
		return <ProductModifying changeFunction={changeFunction} showMessages={showMessages} clearData={clear}/>;
	case selection.roles:
		return <ChangeRoles showMessages={showMessages} clearData={clear}/>;
	case selection.insertASell:
		return <SellInput changeFunction={changeFunction} showMessages={showMessages} clearData={clear}/>;
	}
}

export default class Screen extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			isClicked: false,
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
		(document.querySelector(".data-container") as HTMLDivElement)!.style.display = "grid";
	}

	showMessages(messages: messagesInterface) {
		if (messages)
			this.setState({messages});
	}


	selectHandlerAndHideData(e: any) {
		(document.querySelector(".data-container") as HTMLDivElement)!.style.display = "none";
		this.setState({messages:undefined,data: undefined});
		this.setState({select: parseInt(e.target.value)});
	}

	render() {
		console.log(jwtDecode(this.props.token));
		const {isClicked, data,messages} = this.state;
		return <div className="ScreensContainer">
			<div className="OptionsContainer">
				<LoadingButton
					size="large"
					onClick={this.selectHandlerAndHideData.bind(this)}
					loading={isClicked}
					value="0"
					variant="contained"
				>search for Product</LoadingButton>
				<LoadingButton
					size="large"
					onClick={this.selectHandlerAndHideData.bind(this)}
					loading={isClicked}
					value="1"
					variant="contained">
					get the sells list
				</LoadingButton>
				<LoadingButton
					size="large"
					onClick={this.selectHandlerAndHideData.bind(this)}
					loading={isClicked}
					variant="contained"
					value="2"
				>add/adjust product</LoadingButton>
				<LoadingButton
					size="large"
					onClick={this.selectHandlerAndHideData.bind(this)}
					loading={isClicked}
					value="3"
					variant="contained">
					change roles
				</LoadingButton>
				<LoadingButton
					size="large"
					onClick={this.selectHandlerAndHideData.bind(this)}
					loading={isClicked}
					value="4"
					variant="contained">
					insert a sell
				</LoadingButton>
			</div>
			<GetContent
				select={this.state.select}
				changeFunction={this.changeStateData.bind(this)}
				showMessages={this.showMessages.bind(this)}
				clear={this.clearErrorAndData.bind(this)}/>
			<div className={"data-container"}>
				{data && <ShowData data={data}/>}
				{messages && <ShowError messages={messages}/>}
			</div>
		</div>;


	}
}

