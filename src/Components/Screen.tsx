import React, {Component} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import "../../src/styles/Screen.css";
import SearchProducts from "./Inputs/SearchProducts";
import SellInput from "./Inputs/SellInput";
import SellingInfo from "./Inputs/SellingInfo";
import ProductModifying from "./Inputs/ProductModifying";
import ChangeRoles from "./Inputs/ChangeRoles";
import AddProduct from "./productsModifyingScreens/AddProduct";


export interface Product {
	name: string,
	quantity: number,
	imgSrc: string,
	numberOfSales: number
}

type State = {
    isClicked: boolean,
	data?: Product,
    select: selection.search
}


const GetDataFromRequest = () => {
	return <div>

	</div>;
};

enum selection {
    search,
    getList,
    addAdjDelProduct,
    roles,
   insertASell
}

function GetContent(props: { select: selection, changeFunction: (data:Product) => void}) {
	const {select,changeFunction} = props;
	switch (select) {
	case selection.search:
		return <SearchProducts changeFunction={changeFunction}/>;
	case selection.getList:
		return <SellingInfo changeFunction={changeFunction}/>;
	case selection.addAdjDelProduct:
		return <ProductModifying changeFunction={changeFunction}/>;
	case selection.roles:
		return <ChangeRoles />;
	case selection.insertASell:
		return <SellInput changeFunction={changeFunction}/>;
	}
}

export default class Screen extends Component<Record<string, never>, State> {
	constructor(props: Record<string, never>) {
		super(props);
		this.state = {
			isClicked: false,
			data: undefined,
			select: selection.search
		};
	}




	changeState(data:Product){
		this.setState({data});
	}

	ShowData(){
		if (this.state.data) {
			const {name, imgSrc, quantity, numberOfSales} = this.state.data;
			return <>
				<h1>{name}</h1>
				<img src={imgSrc} alt="image"/>
			</>;
		}
	}

	selectHandler(e: any) {
		this.setState({select: parseInt(e.target.value)});
	}

	render() {
		const isClicked = this.state.isClicked;
		return <div className="ScreensContainer">
			<div className="adminOptionsContainer">
				<LoadingButton
					size="medium"
					onClick={this.selectHandler.bind(this)}
					loading={isClicked}
					value="0"
					variant="contained"
				>search for Product</LoadingButton>
				<LoadingButton
					size="medium"
					onClick={this.selectHandler.bind(this)}
					loading={isClicked}
					value="1"
					variant="contained">
                    get the sells list
				</LoadingButton>
				<LoadingButton
					size="medium"
					onClick={this.selectHandler.bind(this)}
					loading={isClicked}
					variant="contained"
					value="2"
				>add/adjust product</LoadingButton>
				<LoadingButton
					size="medium"
					onClick={this.selectHandler.bind(this)}
					loading={isClicked}
					value="3"
					variant="contained">
                    change roles
				</LoadingButton>
				<LoadingButton
					size="medium"
					onClick={this.selectHandler.bind(this)}
					loading={isClicked}
					value="4"
					variant="contained">
                    insert a sell
				</LoadingButton>
			</div>
			<GetContent select={this.state.select} changeFunction={this.changeState.bind(this)}/>
			{this.state.data && this.ShowData()}
		</div>;


	}
}