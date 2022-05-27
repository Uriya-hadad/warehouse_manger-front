import React, {Component} from "react";
import {TextField} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import ClientScreen from "./Screens/ClientScreen";
import WorkerScreen from "./Screens/WorkerScreen";
import "../../src/styles/Screen.css"
import AdminScreen from "./Screens/AdminScreen";
import SearchProducts from "./Inputs/SearchProducts";
import SellInput from "./Inputs/SellInput";
import SellingInfo from "./Inputs/SellingInfo";
import ProductModifying from "./Inputs/ProductModifying";

type Props = {}

type State = {
    isClicked: boolean,
    data: false,
    select: selection.search
}


const GetDataFromRequest = () => {
    return <div>

    </div>
}

enum selection {
    search,
    getList,
    addAdjDelProduct,
    roles,
   insertASell
}

const GetContent = (props: { select: selection }) => {
    const {select} = props;
    switch (select) {
        case selection.search:
            return <SearchProducts/>
        case selection.getList:
            return <SellingInfo/>
        case selection.addAdjDelProduct:
            return <ProductModifying/>
        case selection.roles:
            return <h1>roles</h1>
        case selection.insertASell:
            return <SellInput/>
    }
}

export default class Screen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isClicked: false,
            data: false,
            select: selection.search
        }
        this.render.bind(this)
    }


    selectHandler(e: any) {
        this.setState({select: parseInt(e.target.value)})
    }

    render() {
        const isClicked = this.state.isClicked;
        return <div className="ScreensContainer">
            <div className="adminOptionsContainer">
                <LoadingButton
                    size="medium"
                    onClick={this.selectHandler.bind(this)}
                    loading={isClicked}
                    value="0"
                    variant="contained"
                >search for Product</LoadingButton>
                <LoadingButton
                    size="medium"
                    onClick={this.selectHandler.bind(this)}
                    loading={isClicked}
                    value="1"
                    variant="contained">
                    get the sells list
                </LoadingButton>
                <LoadingButton
                    size="medium"
                    onClick={this.selectHandler.bind(this)}
                    loading={isClicked}
                    variant="contained"
                    value="2"
                >add/adjust product</LoadingButton>
                <LoadingButton
                    size="medium"
                    onClick={this.selectHandler.bind(this)}
                    loading={isClicked}
                    value="3"
                    variant="contained">
                    change roles
                </LoadingButton>
                <LoadingButton
                    size="medium"
                    onClick={this.selectHandler.bind(this)}
                    loading={isClicked}
                    value="4"
                    variant="contained">
                    insert a sell
                </LoadingButton>
            </div>

            <GetContent select={this.state.select}/>
            {this.state.data && <GetDataFromRequest/>}
        </div>


    }
}