import {Component} from "react";
import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon
    from '@mui/icons-material/Send';
import {gql, request} from "graphql-request";
import "../../styles/SellingInfo.css";
import SellInput from "../Inputs/SellInput";
import SearchProducts from "../Inputs/SearchProducts";

type Props = {}

type State = {
    sell: boolean;
    search: boolean;
    data: boolean;
}

const GetDataFromRequest = () => {
    return <div>

    </div>
}

class WorkerScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sell: true,
            search: false,
            data: false
        }
    }

    searchHandler() {
        this.setState(prevState => {
            return {
                sell: false,
                search: true
            }
        })
    }
    sellHandler() {
        this.setState(prevState => {
            return {
                sell: true,
                search: false
            }
        })
    }

    render() {
        return <>
            <div className="titleContainer">
                <h1 className='screenTitle'>Worker Screen</h1>
            </div>
            <div className="WorkerScreenContainer">
                <div className="WorkerScreenContainerInnerContainer">
                    <div className ="LoadingButtonsContainer">
                    <LoadingButton
                        size="medium"
                        onClick={this.searchHandler.bind(this)}
                        value="0"
                        variant="contained"
                    >search for Product</LoadingButton>
                    <LoadingButton
                        size="medium"
                        onClick={this.sellHandler.bind(this)}
                        value="1"
                        variant="contained">
                        insert a sell
                    </LoadingButton>
                    </div>
                    <h2>Search a product / Make a sell</h2>
                    {this.state.sell && <SellInput/>}
                    {this.state.search && <SearchProducts/>}
                    {}
                </div>
            </div>
            {this.state.data && <GetDataFromRequest/>}
        </>
    }
}

export default WorkerScreen