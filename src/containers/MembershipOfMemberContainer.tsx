import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {Grid, Typography} from "@material-ui/core";
import ClubMembership from "../entity/club/ClubMembership";
import MembershipListOfMemberView from "../views/membershipviews/MembershipListOfMemberView";
import TravelClub from "../entity/club/TravelClub";
import {IStoreProps} from "../stores/IStoreProps";



@inject('clubStore', 'membershipStore')
@observer
class MembershipOfMemberContainer extends Component<IStoreProps>{

    clubProps = this.props.clubStore!;
    membershipProps = this.props.membershipStore!;

    onFindClub (clubId: string): TravelClub | null {
        let foundClub = this.clubProps.retrieve(clubId);
        return foundClub;
    }

    render() {

        let { memberships, membershipState, searchText} = this.membershipProps;

        //파라미터 저장
        let paramId  = window.location.pathname.split('/')[2];
        //검색
        memberships = memberships.filter((searchMembership: ClubMembership) => searchMembership.clubId.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)

        return (
        <>
            <h1>Membership for member "{paramId}"</h1>
            <Grid container justifyContent='center'>
                <Grid item xs={10}>
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