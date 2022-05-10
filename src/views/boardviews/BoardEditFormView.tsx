import {observer} from "mobx-react";
import React, {Component} from "react";
import {Button, Container, FormControl, Input, MenuItem, Paper, Select} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import TravelClub from "../../entity/club/TravelClub";
import {IBoardProps} from "./IBoardProps";



@observer
class BoardEditFormView extends Component<IBoardProps> {

    render() {

        const {board, boardState, alertText, onSetBoardProps, onSetBoardState, onAddBoard, onUpdateBoard, onFindClub } = this.props;  //컨테이너에서 받아온 프롭스

        let clubList = Array.from(this.props.clubs!.values());
        //console.log(clubList);

        return (
            <Container component={Paper}>
                {
                    boardState === true ? <h2>New Board Register</h2> : <h2>Club Id "{board!.clubId}" Update</h2>
                }
                <form>
                    <div className="input_area">
                        <FormControl fullWidth>
                            <label>[Club Id] Club Name </label>
                            {
                                boardState === true ?
                                    <Select defaultValue=''
                                            onChange={(event) => onSetBoardProps!('clubId', '1')}>
                                        <MenuItem disabled value=''>Club Select</MenuItem>
                                        {
                                            clubList.map((club: TravelClub) => (
                                                <MenuItem key={club.clubId} value={club.clubId}>[{club.clubId}] {club.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    :
                                    <Input type="text" disabled value={ board && onFindClub!(board.clubId).name ? "["+board.clubId+"] " + onFindClub!(board.clubId).name : '' }/>
                            }
                        </FormControl>
                    </div>
                    <div className="input_area">
                        <label>Board Name </label>
                        <Input type="text" placeholder="ABC Board"
                               value={ board && board.name ? board.name : '' }
                               onChange={(event) => onSetBoardProps!('name', event.target.value)}/>
                    </div>
                    <div className="input_area">
                        <label>Admin Email </label>
                        <Input type="text" placeholder="abc@gmail.com"
                               value={ board && board.adminEmail ? board.adminEmail : '' }
                               onChange={(event) => onSetBoardProps!('adminEmail', event.target.value)}/>
                    </div>
                    <span className='alertText'>{alertText}</span>
                    <br/><br/>
                    {
                        boardState === true ?
                            <Button variant='contained' color='primary' startIcon={<SaveIcon />}
                                    onClick={onAddBoard}>Add</Button>
                            :<>
                                <Button variant='contained' color='default' startIcon={<SaveIcon />}
                                        onClick={onUpdateBoard}>Update</Button>
                                <br/><br/>
                                <Button variant='contained' color='primary' startIcon={<KeyboardReturnIcon />}
                                        onClick={()=>onSetBoardState!(true)}>Back to Add</Button></>
                        //nowState 값이 true인경우 생성버튼으로 add수행하고 false인 경우 Updatd버튼으로 업데이트 수행
                    }
                    <br/><br/>
                </form>
            </Container>
        );
    }
}
export default BoardEditFormView;