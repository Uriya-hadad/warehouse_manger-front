import React, {Component} from "react";
import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {gql, request} from "graphql-request";
import {Product} from "../Screen";


type State = {
	isClicked: boolean,
	data: boolean,
}
type props = {
	changeFunction: (data:Array<Product>) => void
}


class AddProduct extends Component<props, State> {
	constructor(props: props) {
		super(props);
		this.state = {
			isClicked: false,
			data: false
		};
	}

	searchHandler() {
		this.setState(prevState => ({isClicked: !prevState.isClicked}));
		// const query = gql`
		//      query GetOneProduct($name: String!){
		//         GetOneProduct(name:$name){
		//         name, imgSrc
		//         }
		//   } 
		//
		// `;
		// const nameOfProduct: HTMLInputElement = document.querySelector("#b")!;
		// request("http://localhost:3001/graphql", query, {
		// 	name: nameOfProduct.value
		// }).then((data) => {
		// 	this.setState(prevState => ({isClicked: !prevState.isClicked}));
		// 	console.log(data);
		// });
		
		// this.props.changeFunction(
		// 	{"name": "apple",
		// 		"imgSrc": "https://i5.walmartimages.com/asr/f46d4fa7-6108-4450-a610-cc95a1ca28c5_3.38c2c5b2f003a0aafa618f3b4dc3cbbd.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
		// 		"quantity": 5,
		// 		"numberOfSales": 0});
		this.setState(prevState => ({isClicked: !prevState.isClicked}));

	}

	render() {
		return (
			<>
				<TextField
					id="nameOfProduct"
					label="*Name Of The Product"
					variant="filled"/>
				<TextField
					id="imgUrlOfProduct"
					label="*Img Url"
					variant="filled"/>
				<TextField
					id="quantityOfProduct"
					label="*Quantity"
					variant="filled"/>
				<LoadingButton
					size="large"
					onClick={this.searchHandler.bind(this)}
					endIcon={<SendIcon/>}
					loading={this.state.isClicked}
					loadingPosition="end"
					variant="contained">
					Add product
				</LoadingButton>
			</>
		);
	}
}

export default AddProduct;
