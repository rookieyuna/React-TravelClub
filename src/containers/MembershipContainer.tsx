import {Component} from "react";
import {inject, observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import autobind from "autobind-decorator";
import clubStore from "../stores/ClubStore";
import SearchbarContainer from "./SearchbarContainer";
import MembershipEditFormView from "../views/MembershipEditFormView";
import MembershipListView from "../views/MembershipListView";
import ClubMembership from "../entity/club/ClubMembership";


@inject('clubStore', 'memberStore')
@autobind
@observer
class MembershipContainer extends Component<any, any>{

    //input에 입력되는값 실시간으로 membership 데이터에 업데이트
    onSetMembershipProps(name: string,value: string){
        this.props.clubStore.setMembershipProps(name, value);
    }
    //리스트에서 선택한 값(ClubMembership)으로 받아 현재 선택된 membership으로 변경
    onSelectedMembership(membership: ClubMembership){
        this.props.clubStore.selectedMembership(membership);
    }

    onAddMembership(): void{
        let { clubStore } = this.props;
        //실시간저장 확인작업을 위한 console출력
        //console.log('Input name: '+ this.props.clubStore.club.name);
        //console.log('Input intro: '+ this.props.clubStore.club.intro);

        //클럽이름 입력여부 확인작업
        if(!clubStore.membership.memberEmail || clubStore.membership.memberEmail.length===0){
            alert('Please input member email!');
            return;
        }
        //클럽이름 중복을 방지하기 위한 확인작업
        if(clubStore.retrieveByName(clubStore.membership.memberEmail)){
            alert('The member email is already exist!');
            return;
        }
        //멤버스토어에 있는지 확인필요!!


        else{
            clubStore.addMembership(clubStore.membership);
        }
    }

   onUpdateMembership(){
       this.props.clubStore.updateMembership();
    }

    onRemoveMembership(membership: ClubMembership){

        //삭제 재확인을 위한 confirm 단계
        if(window.confirm('Are you sure to delete membership>?')===true){
            this.props.clubStore.removeMembership(membership);
        }
        else{
            alert('Delete cancelled');
        }
    }

    render() {

        let { membership, memberships, membershipState, searchTextMembership } = this.props.clubStore;

        console.log(this.props);

        //let clubId  = this.props.match.params.clubId;;

        memberships = memberships.filter((searchMembership: ClubMembership) => searchMembership.memberEmail.toLowerCase().indexOf(searchTextMembership.toLowerCase()) !== -1)

        return (
        <>
            <h1>Membership Menu for</h1>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <MembershipEditFormView

                        membership = {membership}
                        membershipState = {membershipState} //입력폼 생성&수정 변경위한 값
                        onSetMembershipProps = {this.onSetMembershipProps}
                        onAddMembership = {this.onAddMembership}
                        onUpdateMembership = {this.onUpdateMembership}
                    />
                </Grid>
                <Grid item xs={9}>
                    <SearchbarContainer />
                    <MembershipListView
                        memberships = {memberships}
                        membershipState = {membershipState} //입력폼 생성&수정 변경위한 값
                        onSelectedMembership = {this.onSelectedMembership} //인풋태그 업데이트용 프롭스로 전달
                        onRemoveMembership = {this.onRemoveMembership} //삭제함수를 프롭스로 전달
                    />
                </Grid>
            </Grid>
        </>
        )
    }
}

export default MembershipContainer;