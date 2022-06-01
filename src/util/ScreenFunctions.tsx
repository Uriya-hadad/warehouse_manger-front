import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import GetProducts from "../Components/Inputs/GetProducts";
import SellingInfo from "../Components/Inputs/SellingInfo";
import ProductModifying from "../Components/Inputs/ProductModifying";
import ChangeRoles from "../Components/Inputs/ChangeRoles";
import SellInput from "../Components/Inputs/SellInput";
import {messagesInterface, Product, selection} from "../Components/mainScreens/Screen";
import "../styles/screenFunctions.css";
import {GraphQLClient}from "graphql-request";
export function GetTiles(props: { role: string, handler: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
	const {handler, role} = props;
	const options = [
		<LoadingButton
			key={"0 - Worker Manger"}
			size="large"
			onClick={handler}
			value="0"
			variant="contained"
		>search for Product
		</LoadingButton>,
		<LoadingButton
			key={"4 - Worker Manger"}
			size="large"
			onClick={handler}
			value="4"
			variant="contained">
			insert a sell
		</LoadingButton>,
		<LoadingButton
			key={"2 - Manger"}
			size="large"
			onClick={handler}
			variant="contained"
			value="2"
		>add/adjust product</LoadingButton>,
		<LoadingButton
			key={"1 - Manger"}
			size="large"
			onClick={handler}
			value="1"
			variant="contained">
			get the sells list
		</LoadingButton>,
		<LoadingButton
			key={"3 - Manger"}
			size="large"
			onClick={handler}
			value="3"
			variant="contained">
			change roles
		</LoadingButton>];
	return <div className="OptionsContainer">
		{options.filter((item) => {
			return ((item.key as string).includes(role));
		})
		}
	</div>;
}

export function ShowError(props: { messages: messagesInterface }) {
	(document.querySelector(".data-container") as HTMLDivElement)!.style.display = "flex";
	const {message, error} = props.messages;
	if (error)
		return <p className="message error">{error}</p>;
	else
		return <p className="message">{message}</p>;
}

export function ShowData(props: { data: Array<Product> }) {
	const data = props.data;
	return <>
		{data.map((item: Product, key) => {
			const {name, imgSrc, quantity, numberOfSales} = item;
			return <div key={key} className={"inner-data-container"}>
				<img src={imgSrc} alt="image"/>
				<h1>{name}</h1>
				<h1>quantity: {quantity}</h1>
				<h1>sales: {numberOfSales}</h1>
			</div>;
		})}
	</>;
}

export function GetContent(props: { select: selection, clear: () => void, graphqlClient: GraphQLClient,showMessages: (messages: messagesInterface) => void, changeFunction: (data: Array<Product>) => void }) {
	const {select, changeFunction, showMessages, clear,graphqlClient} = props;
	switch (select) {
	case selection.search:
		return <GetProducts
			graphqlClient={graphqlClient}
			changeFunction={changeFunction}
			showMessages={showMessages}
			clearData={clear}/>;
	case selection.getList:
		return <SellingInfo
			graphqlClient={graphqlClient}
			changeFunction={changeFunction}
			showMessages={showMessages}
			clearData={clear}/>;
	case selection.addAdjDelProduct:
		return <ProductModifying
			graphqlClient={graphqlClient}
			changeFunction={changeFunction}
			showMessages={showMessages}
			clearData={clear}/>;
	case selection.roles:
		return <ChangeRoles graphqlClient={graphqlClient} showMessages={showMessages} clearData={clear}/>;
	case selection.insertASell:
		return <SellInput
			graphqlClient={graphqlClient}
			changeFunction={changeFunction}
			showMessages={showMessages}
			clearData={clear}/>;
	}
}
