import React,{Component} from "react";
import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {gql, request} from "graphql-request";



type State = {
	isClicked: boolean,
	data: boolean,
}


class DeleteProduct extends Component<Record<string, never>, State> {
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
		return (
			<>
				<TextField
					id="nameOfProduct"
					label="*Name Of The Product"
					variant="filled"/>
				<LoadingButton
					size="large"
					onClick={this.searchHandler.bind(this)}
					endIcon={<SendIcon/>}
					loading={this.state.isClicked}
					loadingPosition="end"
					variant="contained">
					Delete product
				</LoadingButton>
			</>
		);
	}
}

export default DeleteProduct;
