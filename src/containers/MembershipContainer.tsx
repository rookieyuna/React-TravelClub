import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {Grid, Typography} from "@material-ui/core";
import SearchbarContainer from "./SearchbarContainer";
import MembershipEditFormView from "../views/membershipviews/MembershipEditFormView";
import MembershipListView from "../views/membershipviews/MembershipListView";
import ClubMembership from "../entity/club/ClubMembership";
import RoleInClub from "../entity/club/RoleInClub";
import {IStoreProps} from "../stores/IStoreProps";


@inject('clubStore', 'memberStore', 'membershipStore')
@observer
class MembershipContainer extends Component<IStoreProps>{

    clubProps = this.props.clubStore!;
    memberProps = this.props.memberStore!;
    membershipProps = this.props.membershipStore!;

    //input에 입력되는값 실시간으로 membership 데이터에 업데이트
    onSetMembershipProps(name: string,value: string){
        this.membershipProps.setMembershipProps(name, value);
    }
    //리스트에서 선택한 값(ClubMembership)으로 받아 현재 선택된 membership으로 변경
    onSelectedMembership(membership: ClubMembership){
        this.membershipProps.selectedMembership(membership);
    }

    //업데이트 폼에서 등록버튼으로 돌아가기 위한 설정
    onSetMembershipState(mode: boolean){
        this.membershipProps.setMembershipState(mode);
    }

    onAddMembership(paramId: string): void{
        let membershipStore = this.membershipProps;
        const memberEmail = membershipStore.membership.memberEmail;

        //멤버쉽 이메일 입력여부 확인작업
        if(!memberEmail || memberEmail.length===0){
            membershipStore.setAlertText('Please input member email!');
            return;
        }
        //멤버쉽 중복등록을 방지하기 위한 확인작업
        if(membershipStore.getMembership(paramId, memberEmail)){
            membershipStore.setAlertText('Email is already exist!');
            return;
        }
        //멤버스토어에 있는지 확인필요!!
        if(!this.memberProps.retrieve(memberEmail)){
            membershipStore.setAlertText('It is not registered member email in Travel Club');
            return;
        }
        else{
            membershipStore.addMembership(paramId);
        }
    }

   onUpdateMembership(){

       let membershipStore = this.membershipProps;
       // Role입력내용 유효성검증
       if(!(membershipStore.membership.role === "Member" as RoleInClub
       || membershipStore.membership.role === "President" as RoleInClub)){
           membershipStore.setAlertText('Please put President or Member in role');
           return;
       }
       membershipStore.updateMembership();
    }

    onRemoveMembership(membership: ClubMembership){

        //삭제 재확인을 위한 confirm 단계
        if(window.confirm('Are you sure to delete membership?')===true){
            this.membershipProps.removeMembership(membership);
        }
        else{
            alert('Delete cancelled');
        }
    }

    render() {

        let { membership, memberships, alertText, membershipState, searchText } = this.membershipProps;

        let paramId  = window.location.pathname.split('/')[2]; //파라미터 저장
        let clubName = this.clubProps.retrieve(paramId)!.name;

        //검색
        let searchMemberships = Array.from(memberships.values()).filter((searchMembership: ClubMembership) => searchMembership.memberEmail.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)

        return (
        <>
            <h1>Membership for Club Name "{clubName}"</h1>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <MembershipEditFormView

                        membership = {membership}
                        membershipState = {membershipState} //입력폼 생성&수정 변경위한 값
                        alertText = {alertText}
                        onSetMembershipProps = {this.onSetMembershipProps.bind(this)}
                        onSetMembershipState = {this.onSetMembershipState.bind(this)}
                        onAddMembership = {this.onAddMembership.bind(this)}
                        onUpdateMembership = {this.onUpdateMembership.bind(this)}
                    />
                </Grid>
                <Grid item xs={9}>
                    <Typography display={"inline"}>Member Email: </Typography>&nbsp;<SearchbarContainer idx = {"membership"} />
                    <MembershipListView
                        memberships = {searchMemberships}
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