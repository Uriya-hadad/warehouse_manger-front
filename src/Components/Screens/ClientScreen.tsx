import {Component} from "react";
import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon
    from '@mui/icons-material/Send';
import {gql, request} from "graphql-request";
import SearchProducts from "../Inputs/SearchProducts";

type Props = {}

type State = {
    isClicked: boolean;
    data: boolean;
}

const GetDataFromRequest = () => {
    return <div>

    </div>
}


class ClientScreen extends Component<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            isClicked:false,
            data:false
        }

    }

    searchHandler() {
        this.setState(prevState=>({isClicked:!prevState.isClicked}));
        const query = gql`
             query GetOneProduct($name: String!){
                GetOneProduct(name:$name){
                name, imgSrc
                }
          } 
        
        `
        const nameOfProduct: HTMLInputElement= document.querySelector("#b")!;
        request("http://localhost:3001/graphql", query, {
            name: nameOfProduct.value
        }).then((data) => {
            this.setState(prevState=>({isClicked:!prevState.isClicked}));
            console.log(data)
        })
    }

    render() {
        const isClicked = this.state.isClicked;
        return <>
            <div className="titleContainer">
                <h1 className='screenTitle'>Client Screen</h1>
            </div>
            <div className="WorkerScreenContainer">
                <div className="ScreenContainerInnerContainer">
                    <h2>Search a product</h2>
                    <SearchProducts/>
                </div>
            </div>
            {this.state.data && <GetDataFromRequest/>}
        </>
    }
}
export default ClientScreen