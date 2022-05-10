import React, {Component} from "react";
import UpdateIcon from '@material-ui/icons/Update';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {
    Table,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
    TextField, Input
} from '@material-ui/core';
import {observer} from "mobx-react";
import SaveIcon from "@material-ui/icons/Save";


@observer
class PostingEditView extends Component<any>{


    render() {
        //submit하면 각 입력태그의 데이터를 posting observable 에 저장후 add 메서드 실행
        const {posting, onSetPostingProps, onSetPostingState, onUpdatePosting} = this.props;

        return (
            <form method="post">
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell align='center'>Posting Id</TableCell>
                                <TableCell>{posting.postingId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'>Writer Email</TableCell>
                                <TableCell>
                                    <Input type="text" name="writerEmail"
                                           value={ posting && posting.writerEmail ? posting.writerEmail : '' }
                                           onChange={(event) => onSetPostingProps('writerEmail', event.target.value)}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'>Title</TableCell>
                                <TableCell>
                                    <Input type="text" name="title"
                                           value={ posting && posting.title ? posting.title : '' }
                                           onChange={(event) => onSetPostingProps('title', event.target.value)}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'>Contents</TableCell>
                                <TableCell >
                                    <TextField
                                        name="contents"
                                        id="outlined-multiline-flexible"
                                        multiline fullWidth
                                        minRows={10}
                                        maxRows={10}

                                        value={ posting && posting.contents ? posting.contents : '' }
                                        onChange={(event) => onSetPostingProps('contents', event.target.value)}/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
                <div>
                    <Button variant='contained' color='primary' startIcon={<SaveIcon/>}
                            onClick={() => {onUpdatePosting(); onSetPostingState("list")}}>Save</Button>&nbsp;&nbsp;
                    <Button variant='outlined' color='default' startIcon={<ListAltIcon/>}
                            onClick={() => onSetPostingState("list")}>List</Button>
                </div>
            </form>
        )
    }
}

export default PostingEditView;