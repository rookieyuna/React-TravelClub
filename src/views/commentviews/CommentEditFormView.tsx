import React, {Component} from "react";
import {observer} from "mobx-react";
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
    Input, Container, TextField, Typography
} from '@material-ui/core';
import SaveIcon from "@material-ui/icons/Save";



@observer
class CommentView extends Component<any>{


    render() {

        const {comment, commentState, onSetCommentProps, onAddComment, onUpdateComment} = this.props;

        return (
            <TableContainer component={Paper} >
                {commentState === true ?
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell align='center' rowSpan={2}><h3>Comment Register</h3></TableCell>
                            <TableCell align='center' >WriterName</TableCell>
                            <TableCell>
                                <Input type="text"
                                       value={ comment && comment.writer ? comment.writer : '' }
                                       onChange={(event) => onSetCommentProps('writer', event.target.value)}/>
                            </TableCell>
                            <TableCell align='center' rowSpan={2} >
                                <Button variant='contained' color='primary' startIcon={<SaveIcon />}
                                        onClick={()=> onAddComment()}>Add</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Comment contents</TableCell>
                            <TableCell>
                                <TextField type="text" fullWidth
                                       value={ comment && comment.contents ? comment.contents : '' }
                                       onChange={(event) => onSetCommentProps('contents', event.target.value)}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                    :
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell align='center' rowSpan={2}><h3>Comment Update</h3></TableCell>
                            <TableCell align='center' >WriterName</TableCell>
                            <TableCell>
                                <Input type="text"
                                       value={ comment && comment.writer ? comment.writer : '' }
                                       onChange={(event) => onSetCommentProps('writer', event.target.value)}/>
                            </TableCell>
                            <TableCell align='center' rowSpan={2} >
                                <Button variant='contained' color='primary' startIcon={<SaveIcon />}
                                        onClick={()=> onUpdateComment()}>save</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Comment contents</TableCell>
                            <TableCell>
                                <TextField type="text" fullWidth
                                           value={ comment && comment.contents ? comment.contents : '' }
                                           onChange={(event) => onSetCommentProps('contents', event.target.value)}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                }
            </TableContainer>
        )
    }
}

export default CommentView;