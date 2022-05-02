import {observer} from "mobx-react";
import React, {Component} from "react";
import {Button, Container, Paper} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import autobind from "autobind-decorator";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";


@autobind
@observer
class MemberEditFormView extends Component<any, any> {

    render() {

        const { member, memberState, onSetMemberProps, onSetMemberStateToAdd, onAddMember, onUpdateMember } = this.props;  //컨테이너에서 받아온 프롭스

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
                                <input type="text" placeholder="abc@gmail.com"
                                       value={ member && member.email ? member.email : '' }
                                       onChange={(event) => onSetMemberProps('email', event.target.value)}/>
                                : <input type="text" placeholder="abc@gmail.com" style={{backgroundColor: "lightgray"}}
                                         value={ member && member.email ? member.email : '' }/>
                            //업데이트 폼인경우 Email 수정 못하도록 막음(primary key 라서 수정하면 안됨)
                        }
                    </div>
                    <div className="input_area">
                        <label>Member Name </label>
                        <input type="text" placeholder="Bob"
                               value={ member && member.name ? member.name : '' }
                               onChange={(event) => onSetMemberProps('name', event.target.value)}/>
                    </div>
                    <div className="input_area">
                        <label>Member Phone </label>
                        <input type="text" placeholder="010-1111-1111"
                               value={ member && member.phoneNumber ? member.phoneNumber : '' }
                               onChange={(event) => onSetMemberProps('phoneNumber', event.target.value)}/>
                    </div>
                    {
                        memberState === true ? '' :
                    <>
                        <div className="input_area">
                            <label>NickName </label>
                            <input type="text" placeholder=""
                                   value={ member && member.nickName ? member.nickName : '' }
                                   onChange={(event) => onSetMemberProps('nickName', event.target.value)}/>
                        </div>
                        <div className="input_area">
                            <label>BirthDay </label>
                            <input type="text" placeholder="YYYY.MM.DD"
                                   value={ member && member.birthDay ? member.birthDay : '' }
                                   onChange={(event) => onSetMemberProps('birthDay', event.target.value)}/>
                        </div>
                    </>
                    }
                    <br/>
                    {
                        memberState === true ?
                            <Button variant='contained' color='primary' startIcon={<SaveIcon />}
                                  onClick={onAddMember}>Add</Button>
                        : <>
                            <Button variant='contained' color='default' startIcon={<SaveIcon />}
                                  onClick={onUpdateMember}>Update</Button>
                            <br/><br/>
                            <Button variant='contained' color='primary' startIcon={<KeyboardReturnIcon />}
                                  onClick={onSetMemberStateToAdd}>Back to Add</Button>
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