import React, {Component} from "react";
import {
	FormControl,
	MenuItem,
	Select, SelectChangeEvent,
	TextField
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {gql, request} from "graphql-request";
import "../../styles/ChangeRoles.css";

type State = {
	isClicked: boolean,
	data: boolean,
	roleChange: string
}


class ChangeRoles extends Component<Record<string, never>, State> {

	constructor(props: Record<string, never>) {
		super(props);
		this.state = {
			isClicked: false,
			data: false,
			roleChange: "client"
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

	roleChangeHandler(e: SelectChangeEvent) {
		this.setState({roleChange: e.target.value});
	}

	optionsClickHandler(event: React.MouseEvent<HTMLLabelElement>) {
		const option = (event.target as HTMLInputElement).value;
		//TODO
	}

	render() {
		// const roleChangeHandler=(e: SelectChangeEvent)=> {
		// 	this.setState({roleChange: e.target.value});
		// };
		const isClicked = this.state.isClicked;
		return (
			<>
				<div className="LoadingButtonsContainer">
					<h1>Change Role For User</h1>
					<div className={"roleInputContainer"}>
						<TextField id="NameOfUser" label="Name Of User" variant="filled"/>
						<FormControl sx={{m: 2, minWidth: 120}}>
							<Select
								value={this.state.roleChange}
								onChange={this.roleChangeHandler.bind(this)}
								displayEmpty
							>
								<MenuItem value={"Client"}>Client</MenuItem>
								<MenuItem value={"Worker"}>Worker</MenuItem>
								<MenuItem value={"Manger"}>Manger</MenuItem>
							</Select>
						</FormControl>
					</div>
					<LoadingButton
						size="large"
						onClick={this.searchHandler.bind(this)}
						endIcon={<SendIcon/>}
						loading={isClicked}
						loadingPosition="end"
						variant="contained">
						Send Request
					</LoadingButton>
				</div>
			</>
		);
	}
}

export default ChangeRoles;