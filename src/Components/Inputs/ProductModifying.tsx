import React, {Component} from "react";
import {FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {gql, request} from "graphql-request";
import AddProduct from "../modifyingScreens/AddProduct";
import DeleteProduct from "../modifyingScreens/DeleteProduct";
import ModifyProduct from "../modifyingScreens/ModifyProduct";
import {Product} from "../Screen";


type State = {
	addMode: boolean,
	changeMode: boolean,
	deleteMode: boolean,
	data?:Product
}

type props = {
	changeFunction: (data: Array<Product>) => void,
	changeStateError: (error: string) => void,
	clearData: () => void
}


class ProductModifying extends Component<props, State> {

	constructor(props: props) {
		super(props);
		this.state = {
			data:undefined,
			addMode: true,
			changeMode: false,
			deleteMode: false
		};

	}


	optionsClickHandler(event: React.MouseEvent<HTMLLabelElement>) {
		const option = (event.target as HTMLInputElement).value;
		switch (option) {
		case "add":
			this.setState({addMode: true, changeMode: false, deleteMode: false});
			break;
		case "change":
			this.setState({addMode: false, changeMode: true, deleteMode: false});
			break;
		case "delete":
			this.setState({addMode: false, changeMode: false, deleteMode: true});
			break;
		}
	}


	render() {
		const {addMode, changeMode, deleteMode, data} = this.state;
		return (
			<>
				<div className="LoadingButtonsContainer">
					<h1>Search A Product</h1>
					<RadioGroup
						defaultValue="add"
						name="radio-buttons-group"
						row>
						<FormControlLabel
							className="options"
							value="add"
							control={<Radio/>}
							label={<Typography style={{"fontWeight": "bold"}}>Add</Typography>}
							labelPlacement="top"
							onClick={this.optionsClickHandler.bind(this)}/>
						<FormControlLabel
							className="options"
							value="change"
							control={<Radio/>}
							label={<Typography style={{"fontWeight": "bold"}}>Change Props</Typography>}
							labelPlacement="top"
							onClick={this.optionsClickHandler.bind(this)}/>
						<FormControlLabel
							className="options"
							onClick={this.optionsClickHandler.bind(this)}
							value="delete"
							control={<Radio/>}
							label={<Typography style={{"fontWeight": "bold"}}>Delete</Typography>}
							labelPlacement="top"/>
					</RadioGroup>
					{addMode && <AddProduct changeFunction={this.props.changeFunction.bind(this)}/>}
					{deleteMode && <DeleteProduct/>}
					{changeMode && <ModifyProduct/>}
				</div>
			</>
		);
	}
}

export default ProductModifying;