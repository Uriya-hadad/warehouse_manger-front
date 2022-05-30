import React, {Component} from "react";
import {FormControlLabel, Radio, RadioGroup, Slider, TextField, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {gql, request} from "graphql-request";
import "../../styles/SellingInfo.css";
import {Product} from "../Screen";
import {jsonParser} from "../../util/jsonParser";


type State = {
	isLoading: boolean,
	data: boolean,
	limitValue: number,
	choice: string
}
type props = {
	changeFunction: (data: Array<Product>) => void,
	changeStateError: (error: string) => void,
	clearData: () => void
}

const worstListQuery = gql`
					query WorstSellingProducts($limit: Int!){
                			WorstSellingProducts(limit:$limit){
                				name, imgSrc,quantity,numberOfSales
                			}
        			 }`;
const bestListQuery = gql`
					query BestSellingProducts($limit: Int!){
                			BestSellingProducts(limit:$limit){
                				name, imgSrc,quantity,numberOfSales
                			}
        			 }`;


class SellingInfo extends Component<props, State> {

	constructor(props: props) {
		super(props);
		this.state = {
			isLoading: false,
			data: false,
			limitValue: 5,
			choice: "best"
		};

	}

	changeLoadingState() {
		this.setState(prevState => ({isLoading: !prevState.isLoading}));
	}

	async getWorstList() {
		const limitValue = this.state.limitValue;
		const {changeFunction, changeStateError, clearData} = this.props;
		this.changeLoadingState();
		clearData();
		try {
			const data = (await request("http://localhost:3001/graphql", worstListQuery, {
				limit: limitValue
			})).WorstSellingProducts;
			changeFunction(data);
		} catch (e) {
			const obj = jsonParser(e as string).response.errors[0].message;
			changeStateError(obj);
		} finally {
			this.changeLoadingState();
		}
	}

	async getBestList() {
		const limitValue = this.state.limitValue;
		const {changeFunction, changeStateError, clearData} = this.props;
		this.changeLoadingState();
		clearData();
		try {
			const data = (await request("http://localhost:3001/graphql", bestListQuery, {
				limit: limitValue
			})).BestSellingProducts;
			changeFunction(data);
		} catch (e) {
			const obj = jsonParser(e as string).response.errors[0].message;
			changeStateError(obj);
		} finally {
			this.changeLoadingState();
		}
	}

	async fetchData() {
		(document.querySelector(".data-container") as HTMLDivElement)!.style.display = "none";
		const choice = this.state.choice;
		if (choice == "best") await this.getBestList();
		if (choice == "worst") await this.getWorstList();
	}

	getChoice(event: React.MouseEvent<HTMLLabelElement>) {
		const choice = (event.target as HTMLInputElement).value;
		this.setState({choice});
	}

	render() {

		const handleChange = (event: Event, limitValue: number | number[]) => {
			if (typeof limitValue === "number") {
				this.setState({limitValue});
			}
		};
		const isLoading = this.state.isLoading;
		return (
			<>
				<div className="LoadingButtonsContainer">
					<h1>Sale Information</h1>
					<RadioGroup
						defaultValue="best"
						name="radio-buttons-group">
						<FormControlLabel
							className={"listOptionButton"}
							value="best"
							control={<Radio/>}
							label={<Typography style={{"fontWeight": "bold"}}>Best</Typography>}
							onClick={this.getChoice.bind(this)}/>
						<FormControlLabel
							className={"listOptionButton"}
							value="worst"
							control={<Radio/>}
							label={<Typography style={{"fontWeight": "bold"}}>Worst</Typography>}
							onClick={this.getChoice.bind(this)}/>
					</RadioGroup>
					<Typography id="non-linear-slider" gutterBottom>
						Limit result by: {this.state.limitValue}
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
						size="large"
						onClick={this.fetchData.bind(this)}
						endIcon={<SendIcon/>}
						loading={isLoading}
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