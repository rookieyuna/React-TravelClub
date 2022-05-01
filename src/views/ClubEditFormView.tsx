import {observer} from "mobx-react";
import React, {Component} from "react";
import {Button, Container, Paper} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import autobind from "autobind-decorator";


@autobind
@observer
class ClubEditFormView extends Component<any, any> {

    render() {

        const { club, clubState, onSetClubProps, onSetClubStateToAdd, onAddClub, onUpdateClub } = this.props;  //컨테이너에서 받아온 프롭스

        return (
            <Container  component={Paper}>
                {
                    clubState === true ? <h2>New Club Register</h2> : <h2>Club Id "{club.clubId}" Update</h2>
                    //nowState값이 true인경우 생성폼이고 false인 경우 update폼
                }
                <form>
                    <div className="input_area">
                        <label>Club Name </label>
                        <input type="text" placeholder="ABC Club" id="clubName"
                               value={ club && club.name ? club.name : '' }
                               onChange={(event) => onSetClubProps('name', event.target.value)}/>
                    </div>
                    <div className="input_area">
                        <label>Club Intro </label>
                        <input type="text" placeholder="Hello, Welcome"
                               value={ club && club.intro ? club.intro : '' }
                               onChange={(event) => onSetClubProps('intro', event.target.value)}/>
                    </div>
                    <br/>
                    {
                        clubState === true ?
                            <Button variant='contained' color='primary' startIcon={<SaveIcon />}
                                    onClick={onAddClub}>Add</Button>
                        :<>
                            <Button variant='contained' color='default' startIcon={<SaveIcon />}
                                  onClick={onUpdateClub}>Update</Button>
                                <br/><br/>
                            <Button variant='contained' color='primary' startIcon={<KeyboardReturnIcon />}
                                onClick={onSetClubStateToAdd}>Back to Add</Button></>
                        //nowState 값이 true인경우 생성버튼으로 add수행하고 false인 경우 Updatd버튼으로 업데이트 수행
                    }
                    <br/><br/>
                </form>
            </Container>
        );
    }
}
export default ClubEditFormView;