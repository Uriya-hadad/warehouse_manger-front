import {Component, MouseEventHandler} from "react";
import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon
    from '@mui/icons-material/Send';
import {gql, request} from "graphql-request";
import "../../styles/AdminScreen.css";

type Props = {}

type State = {
    isClicked: boolean,
    data: boolean,
    select: selection
}

const GetDataFromRequest = () => {
    return <div>

    </div>
}

enum selection {
    search,
    getList,
    addAdjDelProduct,
    roles
}

const GetContent = (props: { select: selection }) => {
    const {select} = props;
    switch (select) {
        case selection.search:
            return <h1>search</h1>
        case selection.getList:
            return <h1>getList</h1>
        case selection.addAdjDelProduct:
            return <h1>addAdjDelProduct</h1>
        case selection.roles:
            return <h1>roles</h1>
    }
}

class AdminScreen extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isClicked: false,
            data: false,
            select: selection.search
        }
        this.render.bind(this)
    }


    selectHandler(e:any) {
        this.setState({select: parseInt(e.target.value)})
    }

    render() {
        const isClicked = this.state.isClicked;
        return <>
            <div className="titleContainer">
                <h1 className='screenTitle'>Manger Screen</h1>
            </div>
            <div className="AdminScreenContainer">
                <div className="adminOptionsContainer">
                    <LoadingButton
                        size="medium"
                        onClick={this.selectHandler.bind(this)}
                        loading={isClicked}
                        value="0"
                        variant="contained"
                    >search for Products</LoadingButton>
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
                </div>
            </div>
            <GetContent select={this.state.select}/>
            {this.state.data && <GetDataFromRequest/>}
        </>
    }
}

export default AdminScreen