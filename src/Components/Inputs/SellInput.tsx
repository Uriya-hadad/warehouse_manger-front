import React,{Component} from "react";
import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {gql, request} from "graphql-request";


type State = {
    isClicked: boolean,
    data: boolean
}


class SellInput extends Component<Record<string, never>, State> {

	constructor(props: Record<string, never>) {
		super(props);
		this.state = {
			isClicked: false,
			data: false
		};

	}

	searchHandler() {
		this.setState(prevState => ({isClicked: !prevState.isClicked}));
		const query = gql`
             query GetOneProduct($name: String!){
                GetOneProduct(name:$name){
                name, imgSrc
                }
          } 
        
        `;
		const nameOfProduct: HTMLInputElement = document.querySelector("#b")!;
		request("http://localhost:3001/graphql", query, {
			name: nameOfProduct.value
		}).then((data) => {
			this.setState(prevState => ({isClicked: !prevState.isClicked}));
			console.log(data);
		});
	}

	render() {
		const isClicked = this.state.isClicked;
		return (
			<>
				<div className="LoadingButtonsContainer">
					<h1>Insert A Sell</h1>
					<TextField className="workerTextField" id="nameOfProduct"
						label="Name Of The Product" variant="filled"/>
					<TextField className="workerTextField" id="quantity" label="Quantity"
						variant="filled"/>
					<LoadingButton
						size="medium"
						onClick={this.searchHandler.bind(this)}
						endIcon={<SendIcon/>}
						loading={isClicked}
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