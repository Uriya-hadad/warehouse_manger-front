import React, {Component, FormEvent} from "react";
import {FormControlLabel, Radio, RadioGroup, TextField, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {gql, GraphQLClient, request} from "graphql-request";
import {messagesInterface, Product} from "../mainScreens/Screen";
import {jsonParser} from "../../util/function";

type State = {
	isLoading: boolean,
	value: string
}
type props = {
	changeFunction: (data: Array<Product>) => void,
	showMessages: (messages: messagesInterface) => void,
	clearData: () => void,
	graphqlClient:GraphQLClient
}
const allQuery = gql`
					{
						getAllProducts{
						name, imgSrc,quantity,numberOfSales
						}
					}`;
const oneQuery = gql`
             query getOneProduct($name: String!){
                getOneProduct(name:$name){
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
		const {changeFunction, showMessages, clearData} = this.props;
		this.changeLoadingState();
		clearData();
		try {
			const data = (await request("http://localhost:3001/graphql", allQuery)).getAllProducts;
			changeFunction(data);
		} catch (e) {
			const error = jsonParser(e as string).response.errors[0].message;
			showMessages({error});
		} finally {
			this.changeLoadingState();
		}
	}

	async getOneProduct() {
		const {changeFunction, showMessages, clearData,graphqlClient} = this.props;
		this.changeLoadingState();
		const nameOfProduct: HTMLInputElement = document.querySelector("#nameOfProduct")!;
		clearData();
		graphqlClient.setHeader("QueryName","getOneProduct");
		try {
			const data = (await graphqlClient.request( oneQuery, {
				name: nameOfProduct.value
			})).getOneProduct;
			changeFunction([data]);
		} catch (e) {
			const error = jsonParser(e as string).response.errors[0].message;
			showMessages({error});
		} finally {
			this.changeLoadingState();
		}
	}

	async fetchData(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
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
			<form onSubmit={this.fetchData.bind(this)} className="LoadingButtonsContainer">
				<h1>Search A Product</h1>
				<RadioGroup
					id="optionChoice"
					defaultValue="one"
					name="radio-buttons-group">
					<FormControlLabel
						value="one"
						control={<Radio/>}
						label={<Typography style={{"fontWeight": "bold"}}>Get One</Typography>}
						onClick={this.optionsClickHandler.bind(this)}/>
					<FormControlLabel
						onClick={this.optionsClickHandler.bind(this)}
						value="all"
						control={<Radio/>}
						label={<Typography style={{"fontWeight": "bold"}}>Get
							All</Typography>}/>
				</RadioGroup>
				<TextField
					autoComplete={"off"}
					id="nameOfProduct"
					required={true}
					label="Name Of The Product"
					variant="filled"/>
				<LoadingButton
					type={"submit"}
					size="large"
					endIcon={<SendIcon/>}
					loading={isClicked}
					loadingPosition="end"
					variant="contained">
					Search Product
				</LoadingButton>
			</form>
		);
	}
}

export default GetProducts;