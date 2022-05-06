import React, {Component} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button} from '@material-ui/core';
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import SocialBoard from "../../entity/board/SocialBoard";


@observer
class BoardListView extends Component<any>{


    render() {

        const {boards, boardState, onSelectedBoard, onRemoveBoard} = this.props;

        return (

            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Club Id</TableCell>
                            <TableCell align='center'>Board Name</TableCell>
                            <TableCell align='center'>Admin Email</TableCell>
                            <TableCell align='center'>Create Date</TableCell>
                            <TableCell align='center'>Postings</TableCell>
                            <TableCell align='center'>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                    Array.isArray(boards) && boards.length ?
                        boards.map( (board: SocialBoard ) => (
                            <TableRow key={board.clubId} hover >
                                <TableCell align='center'>{board.clubId}</TableCell>
                                <TableCell align='center'>{board.name}</TableCell>
                                <TableCell align='center'>{board.adminEmail}</TableCell>
                                <TableCell align='center'>{board.createDate}</TableCell>
                                <TableCell align='center'><Link to={`/board/${board.clubId}`}><ListAltIcon/></Link></TableCell>
                                <TableCell align='center'>
                                    <Button variant='contained' color='default' startIcon={<UpdateIcon/>}
                                            onClick={() => onSelectedBoard(board)}></Button>&nbsp;&nbsp;
                                    <Button variant='contained' color='secondary' startIcon={<DeleteIcon/>}
                                            onClick={() => onRemoveBoard(board)}></Button>
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

export default BoardListView;