import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import autobind from "autobind-decorator";
import SearchbarContainer from "./SearchbarContainer";
import MembershipEditFormView from "../views/membershipviews/MembershipEditFormView";
import MembershipListView from "../views/membershipviews/MembershipListView";
import ClubMembership from "../entity/club/ClubMembership";
import RoleInClub from "../entity/club/RoleInClub";



@inject('clubStore', 'memberStore', 'membershipStore')
@observer
class MembershipContainer extends Component<any, any>{

    //input에 입력되는값 실시간으로 membership 데이터에 업데이트
    onSetMembershipProps(name: string,value: string){
        this.props.membershipStore.setMembershipProps(name, value);
    }
    //리스트에서 선택한 값(ClubMembership)으로 받아 현재 선택된 membership으로 변경
    onSelectedMembership(membership: ClubMembership){
        this.props.membershipStore.selectedMembership(membership);
    }

    //업데이트 폼에서 등록버튼으로 돌아가기 위한 설정
    onSetMembershipStateToAdd(){
        this.props.membershipStore.setMembershipStateToAdd();
    }

    onAddMembership(paramId: string): void{
        let { membershipStore } = this.props;
        const memberEmail = membershipStore.membership.memberEmail;
        //실시간저장 확인작업을 위한 console출력
        //console.log('Input email: '+ this.props.clubStore.membership.memberEmail);

        //멤버쉽 이메일 입력여부 확인작업
        if(!memberEmail || memberEmail.length===0){
            alert('Please input member email!');
            return;
        }
        //멤버쉽 중복등록을 방지하기 위한 확인작업
        if(membershipStore.getMembership(paramId, memberEmail)){
            alert('The member email is already exist!');
            return;
        }
        //멤버스토어에 있는지 확인필요!!
        /*if(!memberStore.retrieve(memberEmail)){
            alert('It is not registered member email in Travel Club')
            return;
        }*/
        else{
            membershipStore.addMembership(membershipStore.membership, paramId);
        }
    }

   onUpdateMembership(){

       let { membershipStore } = this.props;
       // Role입력내용 유효성검증
       if(!(this.props.membershipStore.membership.role === "Member" as RoleInClub
       || this.props.membershipStore.membership.role === "President" as RoleInClub)){
           alert('Please put President or Member in role')
           return;
       }

       this.props.membershipStore.updateMembership();
    }

    onRemoveMembership(membership: ClubMembership){

        //삭제 재확인을 위한 confirm 단계
        if(window.confirm('Are you sure to delete membership?')===true){
            this.props.membershipStore.removeMembership(membership);
        }
        else{
            alert('Delete cancelled');
        }
    }

    render() {

        let { membership, memberships, membershipState, searchText, paramId } = this.props.membershipStore

        paramId  = window.location.pathname.split('/')[2]; //파라미터 저장

        //검색
        memberships = memberships.filter((searchMembership: ClubMembership) => searchMembership.memberEmail.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)

        return (
        <>
            <h1>Membership for Club {paramId}</h1>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <MembershipEditFormView

                        membership = {membership}
                        membershipState = {membershipState} //입력폼 생성&수정 변경위한 값
                        onSetMembershipProps = {this.onSetMembershipProps.bind(this)}
                        onSetMembershipStateToAdd = {this.onSetMembershipStateToAdd.bind(this)}
                        onAddMembership = {this.onAddMembership.bind(this)}
                        onUpdateMembership = {this.onUpdateMembership.bind(this)}
                    />
                </Grid>
                <Grid item xs={9}>
                    <SearchbarContainer />
                    <MembershipListView
                        memberships = {memberships}
                        membershipState = {membershipState} //입력폼 생성&수정 변경위한 값
                        onSelectedMembership = {this.onSelectedMembership.bind(this)} //인풋태그 업데이트용 프롭스로 전달
                        onRemoveMembership = {this.onRemoveMembership.bind(this)} //삭제함수를 프롭스로 전달
                    />
                </Grid>
            </Grid>
        </>
        )
    }


    componentWillUnmount() {
    }
}

export default MembershipContainer;