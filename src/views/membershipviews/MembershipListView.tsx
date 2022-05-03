import React, {Component} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import {Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button} from '@material-ui/core';
import {observer} from "mobx-react";
import ClubMembership from "../../entity/club/ClubMembership";


@observer
class MembershipListView extends Component<any>{


    render() {

        const {memberships, membershipState, onSelectedMembership, onRemoveMembership} = this.props;

        let paramId  = window.location.pathname.split('/')[2];
        let newLists = memberships.filter((searchMembership: ClubMembership) => searchMembership.clubId === paramId);

        return (
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Member Email</TableCell>
                            <TableCell align='center'>Role</TableCell>
                            <TableCell align='center'>Join Date</TableCell>
                            <TableCell align='center'>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                    Array.isArray(newLists) && newLists.length ?
                        newLists.map( (membership: ClubMembership ) => (
                            <TableRow key={membership.memberEmail} hover >
                                <TableCell align='center'>{membership.memberEmail}</TableCell>
                                <TableCell align='center'>{membership.role}</TableCell>
                                <TableCell align='center'>{membership.joinDate}</TableCell>
                                <TableCell align='center'>
                                    <Button variant='contained' color='default' startIcon={<UpdateIcon/>}
                                            onClick={() => onSelectedMembership(membership)}></Button>&nbsp;&nbsp;
                                    <Button variant='contained' color='secondary' startIcon={<DeleteIcon/>}
                                        onClick={() => onRemoveMembership(membership)}></Button>
                                </TableCell>
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