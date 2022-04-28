import {inject, observer} from "mobx-react";
import {Component, useRef} from "react";
import clubStore from "../stores/ClubStore";
import {Button} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';


@inject('clubStore')
@observer
class ClubEditFormViewView extends Component<any, any> {

    render() {

        const { onAddClub } = this.props;

        let inputName = document.getElementById("clubName");
        let inputIntro = document.getElementById("clubIntro");

        return (

            <form>
                <div className="input_area">
                    <label>Club Name </label>
                    <input type="text" placeholder="ABC Club" id="clubName" />
                </div>
                <div className="input_area">
                    <label>Club Intro </label>
                    <input type="text" placeholder="Hello, Welcome" id="clubIntro" />
                </div>
                <br/>
                <Button variant='contained' color='primary' startIcon={<SaveIcon />}
                        onClick={onAddClub}>Save</Button>&nbsp;&nbsp;
            </form>
        );
    }
}
export default ClubEditFormViewView;