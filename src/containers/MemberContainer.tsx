import {Component} from "react";
import {inject, observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import autobind from "autobind-decorator";
import SearchbarContainer from "./SearchbarContainer";
import CommunityMember from "../entity/club/CommunityMember";
import MemberEditFormView from "../views/MemberEditFormView";
import MemberListView from "../views/MemberListView";


@inject('memberStore')
@autobind
@observer
class MemberContainer extends Component<any, any>{

    //input에 입력되는값 실시간으로 member 데이터에 업데이트
    onSetMemberProps(name: string,value: string){
        this.props.memberStore.setMemberProps(name, value);
    }
    //리스트에서 선택한 값(CommunityMember)으로 받아 현재 선택된 member로 변경
    onSelectedMember(member: CommunityMember){
        this.props.memberStore.selectedMember(member);
    }

    onAddMember(): void{
        let { memberStore } = this.props;
        //실시간저장 확인작업을 위한 console출력
        console.log('Input email: '+ this.props.memberStore.member.email);
        console.log('Input name: '+ this.props.memberStore.member.name);
        console.log('Input phoneNumber: '+ this.props.memberStore.member.phoneNumber);

        //멤버이메일 입력여부 확인작업
        if(!memberStore.member.email || memberStore.member.email.length===0){
            alert('Please input member email!');
            return;
        }
        //멤버이메일 중복 등록을 방지하기 위한 확인작업
        if(memberStore.retrieve(memberStore.member.email)){
            alert('The member email is already exist!');
            return;
        }
        else{
            memberStore.addMember(memberStore.member);
        }
    }

    onUpdateMember(){
        let { memberStore } = this.props;
        //멤버이메일은 변경이 불가능하므로 중복확인작업 필요없음
        memberStore.updateMember();
    }

    onRemoveMember(member: CommunityMember){

        //삭제 재확인을 위한 confirm 단계
        if(window.confirm('Are you sure to delete member?')===true){
            this.props.memberStore.removeMember(member);
        }
        else{
            alert('Delete cancelled');
        }
    }

    render() {

        let { member, members, memberState, searchText } = this.props.memberStore;

        members = members.filter((searchMember: CommunityMember) => searchMember.email.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)

        return (
        <>
            <h1>Member Menu</h1>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <MemberEditFormView
                        member = {member}
                        memberState = {memberState} //입력폼 생성&수정 변경위한 값
                        onSetMemberProps = {this.onSetMemberProps}
                        onAddMember = {this.onAddMember}
                        onUpdateMember = {this.onUpdateMember}
                    />
                </Grid>
                <Grid item xs={9}>
                    <SearchbarContainer />
                    <MemberListView
                        members = {members}
                        memberState = {memberState} //입력폼 생성&수정 변경위한 값
                        onSelectedMember = {this.onSelectedMember} //인풋태그 업데이트용 프롭스로 전달
                        onRemoveMember = {this.onRemoveMember} //삭제함수를 프롭스로 전달
                    />
                </Grid>
            </Grid>
        </>
        )
    }
}

export default MemberContainer;