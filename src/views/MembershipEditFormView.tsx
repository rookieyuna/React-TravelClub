import {observer} from "mobx-react";
import React, {Component} from "react";
import {Button, Container, Paper} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import autobind from "autobind-decorator";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";


@autobind
@observer
class MembershipEditFormView extends Component<any, any> {

    render() {

        const { membership, membershipState, onSetMembershipProps, onSetMembershipStateToAdd, onAddMembership, onUpdateMembership } = this.props;  //컨테이너에서 받아온 프롭스

        let paramId  = window.location.pathname.split('/')[2]; //파라미터 저장

        return (
            <Container  component={Paper}>
                {
                    membershipState === true ? <h2>New Membership Register</h2> : <h2>Membership "{membership.memberEmail}" Update</h2>
                    //nowState값이 true인경우 생성폼이고 false인 경우 update폼
                }
                <form>
                    <div className="input_area">
                        <label>Member Email </label>
                        {
                            membershipState === true ?
                                <input type="text" placeholder="abc@gmail.com"
                                       value={ membership && membership.memberEmail ? membership.memberEmail : '' }
                                       onChange={(event) => onSetMembershipProps('memberEmail', event.target.value)}/>
                                :
                                <input type="text" placeholder="abc@gmail.com" style={{backgroundColor: "lightgray"}}
                                         value={ membership && membership.memberEmail ? membership.memberEmail : '' }/>
                            //업데이트 폼인경우 Email 수정 못하도록 막음(수정하면 안됨)
                        }
                    </div>
                    {
                        membershipState === true ?
                            '':
                            <>
                                <div className="input_area">
                                    <label>Member Role </label>
                                    <input type="text" placeholder="President | Member"
                                           value={ membership && membership.role ? membership.role : '' }
                                           onChange={(event) => onSetMembershipProps('role', event.target.value)}/>
                                </div>
                            </>


                    }
                    <br/>
                    {
                        membershipState === true ?
                            <Button variant='contained' color='primary' startIcon={<SaveIcon />}
                                    onClick={() => onAddMembership(paramId)}>Add</Button>
                        : <>
                            <Button variant='contained' color='default' startIcon={<SaveIcon />}
                                  onClick={onUpdateMembership}>Update</Button>
                            <br/><br/>
                            <Button variant='contained' color='primary' startIcon={<KeyboardReturnIcon />}
                                  onClick={onSetMembershipStateToAdd}>Back to Add</Button>
                        </>
                        //nowState 값이 true인경우 생성버튼으로 add수행하고 false인 경우 Updatd버튼으로 업데이트 수행
                    }
                    <br/><br/>
                </form>
            </Container>
        );
    }
}
export default MembershipEditFormView;