import React, {Component, FormEvent} from "react";
import {FormControlLabel, Radio, RadioGroup, Slider, TextField, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {gql, request} from "graphql-request";
import "../../styles/SellingInfo.css";
import {messagesInterface, Product} from "../mainScreens/Screen";
import {jsonParser} from "../../util/function";


type State = {
	isLoading: boolean,
	data: boolean,
	limitValue: number,
	choice: string
}
type props = {
	changeFunction: (data: Array<Product>) => void,
	showMessages: (messages: messagesInterface) => void,
	clearData: () => void
}

const worstListQuery = gql`
					query worstSellingProducts($limit: Int!){
                			worstSellingProducts(limit:$limit){
                				name, imgSrc,quantity,numberOfSales
                			}
        			 }`;
const bestListQuery = gql`
					query bestSellingProducts($limit: Int!){
                			bestSellingProducts(limit:$limit){
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
		const {changeFunction, showMessages, clearData} = this.props;
		this.changeLoadingState();
		clearData();
		try {
			const data = (await request("http://localhost:3001/graphql", worstListQuery, {
				limit: limitValue
			})).worstSellingProducts;
			changeFunction(data);
		} catch (e) {
			const error = jsonParser(e as string).response.errors[0].message;
			showMessages({error});
		} finally {
			this.changeLoadingState();
		}
	}

	async getBestList() {
		const limitValue = this.state.limitValue;
		const {changeFunction, showMessages, clearData} = this.props;
		this.changeLoadingState();
		clearData();
		try {
			const data = (await request("http://localhost:3001/graphql", bestListQuery, {
				limit: limitValue
			})).bestSellingProducts;
			changeFunction(data);
		} catch (e) {
			const error = jsonParser(e as string).response.errors[0].message;
			showMessages({error});
		} finally {
			this.changeLoadingState();
		}
	}

	async fetchData(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
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
			<form onSubmit={this.fetchData.bind(this)} className="LoadingButtonsContainer">
				<h1>Sale Information</h1>
				<RadioGroup
					defaultValue="best"
					name="radio-buttons-group">
					<FormControlLabel
						className={"listOptionButton"}
						value="best"
						control={<Radio/>}
						label={<span className={"boldText"}>Best</span>}
						onClick={this.getChoice.bind(this)}/>
					<FormControlLabel
						className={"listOptionButton"}
						value="worst"
						control={<Radio/>}
						label={<span className={"boldText"}>Worst</span>}
						onClick={this.getChoice.bind(this)}/>
				</RadioGroup>
				<span className={"boldText"}>
						Limit result by: {this.state.limitValue}
				</span>
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
					type={"submit"}
					endIcon={<SendIcon/>}
					loading={isLoading}
					loadingPosition="end"
					variant="contained">
					Get sales info
				</LoadingButton>
			</form>
		);
	}
}

export default SellingInfo;