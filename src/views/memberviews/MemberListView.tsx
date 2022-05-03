import React, {Component} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button} from '@material-ui/core';
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import CommunityMember from "../../entity/club/CommunityMember";



@observer
class MemberListView extends Component<any>{


    render() {

        const {members, memberState, onSelectedMember, onRemoveMember} = this.props;

        return (

            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Member Email</TableCell>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align='center'>Phone Number</TableCell>
                            <TableCell align='center'>Nickname</TableCell>
                            <TableCell align='center'>BirthDay</TableCell>
                            <TableCell align='center'>Membership</TableCell>
                            <TableCell align='center'>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                    Array.isArray(members) && members.length ?
                        members.map( (member: CommunityMember ) => (
                            <TableRow key={member.email} hover >
                                <TableCell align='center'>{member.email}</TableCell>
                                <TableCell align='center'>{member.name}</TableCell>
                                <TableCell align='center'>{member.phoneNumber}</TableCell>
                                <TableCell align='center'>{member.nickName}</TableCell>
                                <TableCell align='center'>{member.birthDay}</TableCell>
                                <TableCell align='center'><Link to={`/membershipOf/${member.email}`}><ListAltIcon/></Link></TableCell>
                                <TableCell align='center'>
                                    <Button variant='contained' color='default' startIcon={<UpdateIcon/>}
                                            onClick={() => onSelectedMember(member)}></Button>&nbsp;&nbsp;
                                    <Button variant='contained' color='secondary' startIcon={<DeleteIcon/>}
                                        onClick={() => onRemoveMember(member)}></Button>
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

export default MemberListView;