import React, {Component} from "react";
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
} from '@material-ui/core';
import {observer} from "mobx-react";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";
import Comment from "../../entity/board/Comment";


@observer
class CommentListView extends Component<any>{


    render() {

        const {comments, paramId, onSelectedComment, onRemoveComment} = this.props;

        //선택한 board의 postingList만 나오도록 설정
        let commentsList: Comment[] = Array.from(comments.values());
        let newLists = commentsList.filter((searchComment: Comment) => searchComment.postingId === paramId);

        return (
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Writer</TableCell>
                            <TableCell align='center'>Contents</TableCell>
                            <TableCell align='center'>Written Date</TableCell>
                            <TableCell align='center'>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Array.isArray(newLists) && newLists.length ?
                                newLists.map( (comment: Comment ) => (
                                    <TableRow key={comment.commentId} hover >
                                        <TableCell align='center'>{comment.writer}</TableCell>
                                        <TableCell align='center'>{comment.contents}</TableCell>
                                        <TableCell align='center'>{comment.writtenDate}</TableCell>
                                        <TableCell align='center'>
                                            <Button variant='contained' color='default' startIcon={<UpdateIcon/>} size='small'
                                                    onClick={() => onSelectedComment(comment)}></Button>&nbsp;&nbsp;
                                            <Button variant='contained' color='secondary' startIcon={<DeleteIcon/>} size='small'
                                                    onClick={() => onRemoveComment(comment.commentId)}></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : //데이터가 없는경우 Empty 로 나오도록 설정
                                <TableRow>
                                    <TableCell align='center' colSpan={3}>Empty</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default CommentListView;