import React, {Component} from "react";
import {Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button} from '@material-ui/core';
import {observer} from "mobx-react";
import ClubMembership from "../../entity/club/ClubMembership";


@observer
class MembershipListView extends Component<any>{


    render() {

        const {memberships, onFindClub} = this.props;

        let paramId  = window.location.pathname.split('/')[2];
        let newLists = memberships.filter((searchMembership: ClubMembership) => searchMembership.memberEmail === paramId);

        return (
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Club Id</TableCell>
                            <TableCell align='center'>Club Name</TableCell>
                            <TableCell align='center'>Club Intro</TableCell>
                            <TableCell align='center'>Role</TableCell>
                            <TableCell align='center'>Join Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                    Array.isArray(newLists) && newLists.length ?
                        newLists.map( (membership: ClubMembership ) => (
                            <TableRow key={membership.memberEmail} hover >
                                <TableCell align='center'>{membership.clubId}</TableCell>
                                <TableCell align='center'>{onFindClub(membership.clubId).name}</TableCell>
                                <TableCell align='center'>{onFindClub(membership.clubId).intro}</TableCell>
                                <TableCell align='center'>{membership.role}</TableCell>
                                <TableCell align='center'>{membership.joinDate}</TableCell>
                            </TableRow>
                            ))
                            : //데이터가 없는경우 Empty로 나오도록 설정
                            <TableRow>
                                <TableCell align='center' colSpan={6}>Empty</TableCell>
                            </TableRow>
                            }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default MembershipListView;