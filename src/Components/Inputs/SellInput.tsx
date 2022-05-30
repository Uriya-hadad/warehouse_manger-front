import React,{Component} from "react";
import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {gql, request} from "graphql-request";
import {Product} from "../Screen";
import {jsonParser} from "../../util/jsonParser";


type State = {
    isLoading: boolean,
    data: boolean
}
type props = {
	changeFunction: (data: Array<Product>) => void,
	changeStateError: (error: string) => void,
	clearData: () => void
}
const addASellQuery = gql`
             	mutation MakeASell($name: String!,$number:Int!){
                	MakeASell(nameOfProduct:$name,numberOfItemsSold: $number){
                		name, imgSrc,quantity,numberOfSales
                	}
         		}`;

class SellInput extends Component<props, State> {

	constructor(props: props) {
		super(props);
		this.state = {
			isLoading: false,
			data: false
		};
	}

	changeLoadingState() {
		this.setState(prevState => ({isLoading: !prevState.isLoading}));
	}


	async fetchData() {
		const {changeFunction, changeStateError, clearData} = this.props;
		this.changeLoadingState();
		const nameOfProduct: HTMLInputElement = document.querySelector("#nameOfProduct")!;
		const numberOfItemsSold: HTMLInputElement = document.querySelector("#quantity")!;
		const quantity = parseInt(numberOfItemsSold.value);
		clearData();
		try {
			const data = (await request("http://localhost:3001/graphql", addASellQuery, {
				name:nameOfProduct.value,
				number:quantity
			})).MakeASell;
			changeFunction([data]);
		} catch (e) {
			const obj = jsonParser(e as string).response.errors[0].message;
			changeStateError(obj);
		} finally {
			this.changeLoadingState();
		}
	}

	render() {
		const isLoading = this.state.isLoading;
		return (
			<>
				<div className="LoadingButtonsContainer">
					<h1>Insert A Sell</h1>
					<TextField className="workerTextField" id="nameOfProduct"
						label="Name Of The Product" variant="filled"/>
					<TextField className="workerTextField" id="quantity" label="Quantity"
						variant="filled" />
					<LoadingButton
						size="large"
						onClick={this.fetchData.bind(this)}
						endIcon={<SendIcon/>}
						loading={isLoading}
						loadingPosition="end"
						variant="contained"
					>Enter A Sell
					</LoadingButton>
				</div>
			</>
		);
	}
}

export default SellInput;