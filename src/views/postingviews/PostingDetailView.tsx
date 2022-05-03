import React, {Component} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import {
    Table,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
} from '@material-ui/core';
import {observer} from "mobx-react";
import ListAltIcon from "@mui/icons-material/ListAlt";

@observer
class PostingDetailView extends Component<any>{


    render() {

        const {posting, onSetPostingProps, onSetPostingState, onRemovePosting} = this.props;

        return (
            <>
                <TableContainer component={Paper} >
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell align='center' >Posting Id</TableCell>
                                <TableCell>{posting.postingId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'>Writer Email</TableCell>
                                <TableCell>{posting.writerEmail}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'>Title</TableCell>
                                <TableCell>{posting.title}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'>Contents</TableCell>
                                <TableCell >
                                    {posting.contents}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
                <div>
                    <Button variant='contained' color='default' startIcon={<UpdateIcon/>}
                            onClick={() => onSetPostingState("edit")}>Modify</Button>&nbsp;&nbsp;
                    <Button variant='contained' color='secondary' startIcon={<DeleteIcon/>}
                            onClick={() => {onRemovePosting(posting.postingId); onSetPostingState("list")}}>Delete</Button>&nbsp;&nbsp;
                    <Button variant='contained' color='default' startIcon={<ListAltIcon/>}
                            onClick={() => onSetPostingState("list")}>List</Button>
                </div>
            </>
        )
    }
}

export default PostingDetailView;