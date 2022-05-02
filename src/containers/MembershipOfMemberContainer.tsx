import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import autobind from "autobind-decorator";
import SearchbarContainer from "./SearchbarContainer";
import ClubMembership from "../entity/club/ClubMembership";
import MembershipListOfMemberView from "../views/membershipviews/MembershipListOfMemberView";
import TravelClub from "../entity/club/TravelClub";



@inject('clubStore', 'membershipStore')
@observer
class MembershipOfMemberContainer extends Component<any, any>{

    onFindClub (clubId: string): TravelClub {
        let foundClub = this.props.clubStore.retrieve(clubId);
        return foundClub;
    }

    render() {

        let { memberships, membershipState, searchText} = this.props.membershipStore;

        //파라미터 저장
        let paramId  = window.location.pathname.split('/')[2];
        //검색
        memberships = memberships.filter((searchMembership: ClubMembership) => searchMembership.memberEmail.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)

        return (
        <>
            <h1>Membership for {paramId}</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SearchbarContainer />
                    <MembershipListOfMemberView
                        memberships = {memberships}
                        membershipState = {membershipState} //입력폼 생성&수정 변경위한 값
                        onFindClub = {this.onFindClub.bind(this)}
                    />
                </Grid>
            </Grid>
        </>
        )
    }
}

export default MembershipOfMemberContainer;