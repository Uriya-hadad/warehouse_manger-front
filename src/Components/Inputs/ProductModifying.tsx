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





class ProductModifying extends Component<Props, State> {

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
          } 
        
        `
        const nameOfProduct: HTMLInputElement = document.querySelector("#b")!;
        request("http://localhost:3001/graphql", query, {
            name: nameOfProduct.value
        }).then((data) => {
            this.setState(prevState => ({isClicked: !prevState.isClicked}));
            console.log(data)
        })
    }

    optionsClickHandler(event: React.MouseEvent<HTMLLabelElement>) {
        const option = (event.target as HTMLInputElement).value;
        //TODO
    }

    render() {
        const isClicked = this.state.isClicked;
        return (
            <>
                <div className="LoadingButtonsContainer">
                    <h1>Search A Product</h1>
                    <RadioGroup
                        defaultValue="one"
                        name="radio-buttons-group"
                        row>
                        <FormControlLabel className="options"
                                          value="add"
                                          control={<Radio/>}
                                          label="Add"
                                          labelPlacement="top"
                                          onClick={this.optionsClickHandler}/>
                        <FormControlLabel className="options"
                                          value="change"
                                          control={<Radio/>}
                                          label="Change Props"
                                          labelPlacement="top"
                                          onClick={this.optionsClickHandler}/>
                        <FormControlLabel className="options"
                                          onClick={this.optionsClickHandler}
                                          value="Delete"
                                          control={<Radio/>}
                                          label="Delete"
                                          labelPlacement="top"/>
                    </RadioGroup>
                    <TextField id="nameOfProduct"
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

export default ProductModifying;