import {observer} from "mobx-react";
import React, {Component} from "react";
import {Button, Container, Paper} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import TravelClub from "../../entity/club/TravelClub";



@observer
class BoardEditFormView extends Component<any, any> {

    render() {

        const {board, boardState, onSetBoardProps, onSetBoardStateToAdd, onAddBoard, onUpdateBoard, onFindClub } = this.props;  //컨테이너에서 받아온 프롭스

        let clubList: TravelClub[] = this.props.clubs;

        console.log(clubList);

        return (
            <Container  component={Paper}>
                {
                    boardState === true ? <h2>New Board Register</h2> : <h2>Club Id "{board.clubId}" Update</h2>
                    //nowState값이 true인경우 생성폼이고 false인 경우 update폼
                }
                <form>
                    <div className="input_area">
                        <label>Club Id </label>
                        {
                            boardState === true ?
                            <select onChange={(event) => onSetBoardProps('clubId', event.target.value)}>
                                {
                                    clubList.map((club: TravelClub) => (
                                        <option key={club.clubId} value={club.clubId}>{club.name}</option>
                                    ))
                                }
                            </select>
                            :
                            <input type="text" placeholder=""
                                   value={ board && onFindClub(board.clubId).name ? onFindClub(board.clubId).name : '' }/>
                        }
                    </div>
                    <div className="input_area">
                        <label>Board Name </label>
                        <input type="text" placeholder="ABC Board"
                               value={ board && board.name ? board.name : '' }
                               onChange={(event) => onSetBoardProps('name', event.target.value)}/>
                    </div>
                    <div className="input_area">
                        <label>Admin Email </label>
                        <input type="text" placeholder="abc@gmail.com"
                               value={ board && board.adminEmail ? board.adminEmail : '' }
                               onChange={(event) => onSetBoardProps('adminEmail', event.target.value)}/>
                    </div>
                    <br/>
                    {
                        boardState === true ?
                            <Button variant='contained' color='primary' startIcon={<SaveIcon />}
                                    onClick={onAddBoard}>Add</Button>
                        :<>
                            <Button variant='contained' color='default' startIcon={<SaveIcon />}
                                  onClick={onUpdateBoard}>Update</Button>
                                <br/><br/>
                            <Button variant='contained' color='primary' startIcon={<KeyboardReturnIcon />}
                                onClick={onSetBoardStateToAdd}>Back to Add</Button></>
                        //nowState 값이 true인경우 생성버튼으로 add수행하고 false인 경우 Updatd버튼으로 업데이트 수행
                    }
                    <br/><br/>
                </form>
            </Container>
        );
    }
}
export default BoardEditFormView;