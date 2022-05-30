import React, {Component} from "react";
import {FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {gql, request} from "graphql-request";
import {Product} from "../Screen";
import {jsonParser} from "../../util/jsonParser";

type State = {
	isLoading: boolean,
	value: string
}
type props = {
	changeFunction: (data: Array<Product>) => void,
	changeStateError: (error: string) => void,
	clearData: () => void
}
const allQuery = gql`
					{
						GetAllProducts{
						name, imgSrc,quantity,numberOfSales
						}
					}`;
const oneQuery = gql`
             query GetOneProduct($name: String!){
                GetOneProduct(name:$name){
                name, imgSrc,quantity,numberOfSales
                }
         		 }`;

class GetProducts extends Component<props, State> {
	constructor(props: props) {
		super(props);
		this.state = {
			isLoading: false,
			value: "one"
		};

	}

	changeLoadingState() {
		this.setState(prevState => ({isLoading: !prevState.isLoading}));
	}

	async getAllProduct() {
		const {changeFunction, changeStateError, clearData} = this.props;
		this.changeLoadingState();
		clearData();
		try {
			const data = (await request("http://localhost:3001/graphql", allQuery)).GetAllProducts;
			changeFunction(data);
		} catch (e) {
			const obj = jsonParser(e as string).response.errors[0].message;
			changeStateError(obj);
		} finally {
			this.changeLoadingState();
		}
	}

	async getOneProduct() {
		const {changeFunction, changeStateError, clearData} = this.props;
		this.changeLoadingState();
		const nameOfProduct: HTMLInputElement = document.querySelector("#nameOfProduct")!;
		clearData();
		try {
			const data = (await request("http://localhost:3001/graphql", oneQuery, {
				name: nameOfProduct.value
			})).GetOneProduct;
			changeFunction([data]);
		} catch (e) {
			const obj = jsonParser(e as string).response.errors[0].message;
			changeStateError(obj);
		} finally {
			this.changeLoadingState();
		}
	}

	async fetchData() {
		const {value} = this.state;
		if (value == "one") await this.getOneProduct();
		if (value == "all") await this.getAllProduct();
	}

	optionsClickHandler(event: React.MouseEvent<HTMLLabelElement>) {
		const value = (event.target as HTMLInputElement).value;
		this.setState({value});
		const nameOfProduct: HTMLInputElement = document.querySelector("#nameOfProduct")!;
		nameOfProduct.disabled = value === "all";
		nameOfProduct.value = "";
	}

	render() {
		const isClicked = this.state.isLoading;
		return (
			<>
				<div className="LoadingButtonsContainer">
					<h1>Search A Product</h1>
					<RadioGroup
						id="optionChoice"
						defaultValue="one"
						name="radio-buttons-group">
						<FormControlLabel
							value="one"
							control={<Radio/>}
							label="Get One"
							onClick={this.optionsClickHandler.bind(this)}/>
						<FormControlLabel
							className={"RadioButton"}
							onClick={this.optionsClickHandler.bind(this)}
							value="all"
							control={<Radio/>}
							label="Get All"/>
					</RadioGroup>
					<TextField
						id="nameOfProduct"
						required={true}
						label="Name Of The Product"
						variant="filled"/>
					<LoadingButton
						size="medium"
						onClick={this.fetchData.bind(this)}
						endIcon={<SendIcon/>}
						loading={isClicked}
						loadingPosition="end"
						variant="contained">
						Search Product
					</LoadingButton>
				</div>
			</>
		);
	}
}

export default GetProducts;