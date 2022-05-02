import React, {Component} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button} from '@material-ui/core';
import {inject, observer} from "mobx-react";
import TravelClub from "../entity/club/TravelClub";
import autobind from "autobind-decorator";
import CommunityMember from "../entity/club/CommunityMember";
import ClubMembership from "../entity/club/ClubMembership";

@autobind
@observer
class MembershipListView extends Component<any, any>{


    render() {

        const {memberships, membershipState, onSelectedMembership, onRemoveMembership} = this.props;

        return (


            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Club Id</TableCell>
                            <TableCell align='center'>Email</TableCell>
                            <TableCell align='center'>Role</TableCell>
                            <TableCell align='center'>Join Date</TableCell>
                            <TableCell align='center'>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                    Array.isArray(memberships) && memberships.length ?
                        memberships.map( (membership: ClubMembership ) => (
                            <TableRow key={membership.memberEmail} hover >
                                <TableCell align='center'>{membership.clubId}</TableCell>
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