import React, {Component} from "react";
import CreateIcon from '@mui/icons-material/Create';
import {Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button} from '@material-ui/core';
import {observer} from "mobx-react";
import Posting from "../../entity/board/Posting";



@observer
class BoardListView extends Component<any>{


    render() {

        const {postings, onSetPostingState, onSelectedPosting, onReadCountAdd} = this.props;

        //선택한 board의 postingList만 나오도록 설정
        let paramId  = window.location.pathname.split('/')[2];
        let newLists = postings.filter((searchPosting: Posting) => searchPosting.boardId === paramId);

        return (
        <>
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Posting Id</TableCell>
                            <TableCell align='center'>Title</TableCell>
                            <TableCell align='center'>Writer</TableCell>
                            <TableCell align='center'>Date</TableCell>
                            <TableCell align='center'>ReadCount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Array.isArray(newLists) && newLists.length ?
                                newLists.map( (posting: Posting ) => (
                                    <TableRow key={posting.postingId} hover onClick={()=> {onSelectedPosting(posting); onSetPostingState("detail"); onReadCountAdd()}} >
                                        <TableCell align='center'>{posting.postingId}</TableCell>
                                        <TableCell align='center' >{posting.title}</TableCell>
                                        <TableCell align='center'>{posting.writerEmail}</TableCell>
                                        <TableCell align='center'>{posting.writtenDate}</TableCell>
                                        <TableCell align='center'>{posting.readCount}</TableCell>
                                    </TableRow>
                                ))
                                : //데이터가 없는경우 Empty 로 나오도록 설정
                                <TableRow>
                                    <TableCell align='center' colSpan={5}>Empty</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <div>
                <Button variant='contained' color='primary' startIcon={<CreateIcon /> }
                    onClick={()=>onSetPostingState("write")}>New Post</Button>
            </div>
        </>
        )
    }
}

export default BoardListView;