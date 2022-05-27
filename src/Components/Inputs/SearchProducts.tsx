import React, {Component, MouseEventHandler} from "react";
import {FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {gql, request} from "graphql-request";

type Props = {}

type State = {
    isClicked: boolean,
    data: boolean
}


class SearchProducts extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isClicked: false,
            data: false
        }

    }

    searchHandler() {

        this.setState(prevState => ({isClicked: !prevState.isClicked}));
        const query = gql`
             query GetOneProduct($name: String!){
                GetOneProduct(name:$name){
                name, imgSrc
                }
          }`
        const nameOfProduct: HTMLInputElement = document.querySelector("#nameOfProduct")!;
        request("http://localhost:3001/graphql", query, {
            name: nameOfProduct.value
        }).then((data) => {
            console.log(data)
        }).catch(err => console.log(err)).finally(() =>
            this.setState(prevState => ({isClicked: !prevState.isClicked})));
    }

    optionsClickHandler(event: React.MouseEvent<HTMLLabelElement>) {
        const nameOfProduct: HTMLInputElement = document.querySelector("#nameOfProduct")!
        nameOfProduct.disabled = (event.target as HTMLInputElement).value === "all";
    }

    render() {
        const isClicked = this.state.isClicked;
        return (
            <>
                <div className="LoadingButtonsContainer">
                    <h1>Search A Product</h1>
                    <RadioGroup
                        defaultValue="one"
                        name="radio-buttons-group">
                        <FormControlLabel value="one" control={<Radio/>} label="Get One"
                                          onClick={this.optionsClickHandler}/>
                        <FormControlLabel className={"RadioButton"}
                                          onClick={this.optionsClickHandler}
                                          value="all" control={<Radio/>} label="Get All"/>
                    </RadioGroup>
                    <TextField id="nameOfProduct" required={true}
                               label="Name Of The Product" variant="filled"/>
                    <LoadingButton
                        size="medium"
                        onClick={this.searchHandler.bind(this)}
                        endIcon={<SendIcon/>}
                        loading={isClicked}
                        loadingPosition="end"
                        variant="contained">
                        Search Product
                    </LoadingButton>
                </div>
            </>
        );
    }
}

export default SearchProducts;