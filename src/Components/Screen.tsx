import React, {Component} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import "../../src/styles/Screen.css";
import GetProducts from "./Inputs/GetProducts";
import SellInput from "./Inputs/SellInput";
import SellingInfo from "./Inputs/SellingInfo";
import ProductModifying from "./Inputs/ProductModifying";
import ChangeRoles from "./Inputs/ChangeRoles";


export interface Product {
	name: string,
	quantity: number,
	imgSrc: string,
	numberOfSales: number
}

type State = {
	isClicked: boolean,
	data?: Array<Product>,
	select: selection.search,
	error: string
}

enum selection {
	search,
	getList,
	addAdjDelProduct,
	roles,
	insertASell
}

function ShowError(props: { error: string }) {
	(document.querySelector(".data-container") as HTMLDivElement)!.style.display = "flex";
	return <p id="errorMessage">{props.error}</p>;
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

function GetContent(props: { select: selection, clear: () => void, changeStateError: (error: string) => void, changeFunction: (data: Array<Product>) => void }) {
	const {select, changeFunction, changeStateError, clear} = props;
	switch (select) {
	case selection.search:
		return <GetProducts changeFunction={changeFunction} changeStateError={changeStateError} clearData={clear}/>;
	case selection.getList:
		return <SellingInfo changeFunction={changeFunction} changeStateError={changeStateError} clearData={clear}/>;
	case selection.addAdjDelProduct:
		return <ProductModifying changeFunction={changeFunction} changeStateError={changeStateError} clearData={clear}/>;
	case selection.roles:
		return <ChangeRoles/>;
	case selection.insertASell:
		return <SellInput changeFunction={changeFunction} changeStateError={changeStateError} clearData={clear}/>;
	}
}

export default class Screen extends Component<Record<string, never>, State> {
	constructor(props: Record<string, never>) {
		super(props);
		this.state = {
			isClicked: false,
			data: undefined,
			select: selection.search,
			error: ""
		};
	}

	clearErrorAndData() {
		(document.querySelector(".data-container") as HTMLDivElement)!.style.display = "none";
		this.setState({error: "", data: undefined});
	}

	changeStateData(data?: Array<Product>) {
		this.setState({data});
		(document.querySelector(".data-container") as HTMLDivElement)!.style.display = "grid";
	}

	changeStateError(error: string) {
		if (error)
			this.setState({error});
	}


	selectHandlerAndHideData(e: any) {
		(document.querySelector(".data-container") as HTMLDivElement)!.style.display = "none";
		this.setState({data: undefined});
		this.setState({select: parseInt(e.target.value)});
	}

	render() {
		const {isClicked, data, error} = this.state;
		if (data)
			console.log("data");
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
				changeStateError={this.changeStateError.bind(this)}
				clear={this.clearErrorAndData.bind(this)}/>
			<div className={"data-container"}>
				{data && <ShowData data={data}/>}
				{error && <ShowError error={error}/>}
			</div>
		</div>;


	}
}

