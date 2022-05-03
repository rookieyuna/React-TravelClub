import React, {Component} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button} from '@material-ui/core';
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import TravelClub from "../../entity/club/TravelClub";



@observer
class ClubListView extends Component<any>{


    render() {

        const {clubs, clubState, onSelectedClub, onRemoveClub} = this.props;

        return (

            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Club Id</TableCell>
                            <TableCell align='center'>Club Name</TableCell>
                            <TableCell align='center'>Club Intro</TableCell>
                            <TableCell align='center'>Foundation Date</TableCell>
                            <TableCell align='center'>Membership</TableCell>
                            <TableCell align='center'>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                    Array.isArray(clubs) && clubs.length ?
                        clubs.map( (club: TravelClub ) => (
                            <TableRow key={club.clubId} hover >
                                <TableCell align='center'>{club.clubId}</TableCell>
                                <TableCell align='center'>{club.name}</TableCell>
                                <TableCell align='center'>{club.intro}</TableCell>
                                <TableCell align='center'>{club.foundationDate}</TableCell>
                                <TableCell align='center'><Link to={`/membership/${club.clubId}`}><ListAltIcon/></Link></TableCell>
                                <TableCell align='center'>
                                    <Button variant='contained' color='default' startIcon={<UpdateIcon/>}
                                            onClick={() => onSelectedClub(club)}></Button>&nbsp;&nbsp;
                                    <Button variant='contained' color='secondary' startIcon={<DeleteIcon/>}
                                        onClick={() => onRemoveClub(club)}></Button>
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

export default ClubListView;