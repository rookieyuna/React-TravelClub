import {observer} from "mobx-react";
import React, {Component} from "react";
import {Button, Container, Input, Paper} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';






@observer
class MemberEditFormView extends Component<any> {

    render() {

        const { member, memberState, alertText, onSetMemberProps, onSetMemberState, onAddMember, onUpdateMember } = this.props;  //컨테이너에서 받아온 프롭스

        return (
            <Container  component={Paper}>
                {
                    memberState === true ? <h2>New Member Register</h2> : <h2>Member "{member.email}" Update</h2>
                    //nowState값이 true인경우 생성폼이고 false인 경우 update폼
                }
                <form>
                    <div className="input_area">
                        <label>Member Email </label>
                        {
                            memberState === true ?
                                <Input type="text" placeholder="abc@gmail.com"
                                       value={ member && member.email ? member.email : '' }
                                       onChange={(event) => onSetMemberProps('email', event.target.value)}/>
                                : <Input type="text" placeholder="abc@gmail.com" disabled
                                         value={ member && member.email ? member.email : '' }/>
                            //업데이트 폼인경우 Email 수정 못하도록 막음(primary key 라서 수정하면 안됨)
                        }
                    </div>
                    <div className="input_area">
                        <label>Member Name</label>
                        <Input type="text" placeholder="Bob"
                               value={ member && member.name ? member.name : '' }
                               onChange={(event) => onSetMemberProps('name', event.target.value)}/>
                    </div>
                    <div className="input_area">
                        <label>Member Phone</label>
                        <Input type="text" placeholder="010-1111-1111"
                               value={ member && member.phoneNumber ? member.phoneNumber : '' }
                               onChange={(event) => onSetMemberProps('phoneNumber', event.target.value)}/>
                    </div>
                    <div className="input_area">
                        <label>NickName</label>
                        <Input type="text" placeholder=""
                               value={ member && member.nickName ? member.nickName : '' }
                               onChange={(event) => onSetMemberProps('nickName', event.target.value)}/>
                    </div>
                    <div className="input_area">
                        <label>BirthDay</label>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                inputFormat="yyyy-MM-dd"
                                value={ member && member.birthDay ? member.birthDay : null } // 데이터가 있으면 데이터 없으면 공백
                                onChange={(date) => onSetMemberProps('birthDay', date!.valueOf())}
                                renderInput={(params) => <TextField  {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <span className='alertText'>{alertText}</span>
                    <br/><br/>

                    {
                        memberState === true ?
                            <Button variant='contained' color='primary' startIcon={<SaveIcon />}
                                  onClick={onAddMember}>Add</Button>
                        : <>
                            <Button variant='contained' color='default' startIcon={<SaveIcon />}
                                  onClick={onUpdateMember}>Update</Button>
                            <br/><br/>
                            <Button variant='contained' color='primary' startIcon={<KeyboardReturnIcon />}
                                  onClick={()=>onSetMemberState(true)}>Back to Add</Button>
                        </>
                        //nowState 값이 true인경우 생성버튼으로 add수행하고 false인 경우 Update버튼으로 업데이트 수행
                    }
                    <br/><br/>
                </form>
            </Container>
        );
    }
}
export default MemberEditFormView;