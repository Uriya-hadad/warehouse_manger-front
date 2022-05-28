import React, {Component} from "react";
import {FormControlLabel, Radio, RadioGroup, Slider, TextField, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {gql, request} from "graphql-request";
import "../../styles/SellingInfo.css";
import {Product} from "../Screen";


type State = {
    isClicked: boolean,
    data: boolean,
    value: number,
}
type props = {
	changeFunction: (data:Product) => void
}

class SellingInfo extends Component<props, State> {

	constructor(props: props) {
		super(props);
		this.state = {
			isClicked: false,
			data: false,
			value: 5
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

		const handleChange = (event: Event, newValue: number | number[]) => {
			if (typeof newValue === "number") {
				this.setState({value: newValue});
			}
		};


		const isClicked = this.state.isClicked;
		return (
			<>
				<div className="LoadingButtonsContainer">
					<h1>Sale Information</h1>
					<RadioGroup
						defaultValue="best"
						name="radio-buttons-group">
						<FormControlLabel value="best" control={<Radio/>} label="Best"/>
						<FormControlLabel className={"RadioButton"} value="worst" control={<Radio/>} label="Worst"/>
					</RadioGroup>
					<Typography id="non-linear-slider" gutterBottom>
                        Limit result by: {this.state.value}
					</Typography>
					<Slider
						id="limitSlider"
						defaultValue={5}
						valueLabelDisplay="on"
						step={1}
						onChange={handleChange}
						min={5}
						max={30}
					/>
					<LoadingButton
						size="medium"
						onClick={this.searchHandler.bind(this)}
						endIcon={<SendIcon/>}
						loading={isClicked}
						loadingPosition="end"
						variant="contained">
                        Get sales info
					</LoadingButton>
				</div>
			</>
		);
	}
}

export default SellingInfo;