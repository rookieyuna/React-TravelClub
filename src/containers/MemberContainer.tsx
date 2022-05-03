import {Component} from "react";
import {inject, observer} from "mobx-react";
import {Grid, Typography} from "@material-ui/core";
import SearchbarContainer from "./SearchbarContainer";
import CommunityMember from "../entity/club/CommunityMember";
import MemberEditFormView from "../views/memberviews/MemberEditFormView";
import MemberListView from "../views/memberviews/MemberListView";


@inject('memberStore')

@observer
class MemberContainer extends Component<any>{

    //input에 입력되는값 실시간으로 member 데이터에 업데이트
    onSetMemberProps(name: string,value: string){
        this.props.memberStore.setMemberProps(name, value);
    }
    //리스트에서 선택한 값(CommunityMember)으로 받아 현재 선택된 member로 변경
    onSelectedMember(member: CommunityMember){
        this.props.memberStore.selectedMember(member);
    }
    //업데이트 폼에서 등록버튼으로 돌아가기 위한 설정
    onSetMemberStateToAdd(){
        this.props.memberStore.setMemberStateToAdd();
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
                        onSetMemberProps = {this.onSetMemberProps.bind(this)}
                        onSetMemberStateToAdd ={this.onSetMemberStateToAdd.bind(this)}
                        onAddMember = {this.onAddMember.bind(this)}
                        onUpdateMember = {this.onUpdateMember.bind(this)}
                    />
                </Grid>
                <Grid item xs={9}>
                    <Typography display={"inline"}>Member Email: </Typography>&nbsp;<SearchbarContainer idx={"member"} />
                    <MemberListView
                        members = {members}
                        memberState = {memberState} //입력폼 생성&수정 변경위한 값
                        onSelectedMember = {this.onSelectedMember.bind(this)} //인풋태그 업데이트용 프롭스로 전달
                        onRemoveMember = {this.onRemoveMember.bind(this)} //삭제함수를 프롭스로 전달
                    />
                </Grid>
            </Grid>
        </>
        )
    }
}

export default MemberContainer;