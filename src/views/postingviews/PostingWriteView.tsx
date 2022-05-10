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
class PostingWriteView extends Component<any>{


    render() {
        const {onSetPostingProps, alertText, onSetPostingState, onAddPosting} = this.props;

        return (
            <form>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell align='center'>Writer Email</TableCell>
                                <TableCell>
                                    <Input type="text" name="writerEmail"
                                           onChange={(event) => onSetPostingProps('writerEmail', event.target.value)}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'>Title</TableCell>
                                <TableCell>
                                    <Input type="text" name="title"
                                           onChange={(event) => onSetPostingProps('title', event.target.value)}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'>Contents</TableCell>
                                <TableCell >
                                    <TextField
                                        name="contents"
                                        onChange={(event) => onSetPostingProps('contents', event.target.value)}
                                        id="outlined-multiline-flexible"
                                        multiline
                                        fullWidth
                                        minRows={10}
                                        maxRows={10}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <span className='alertText'>{alertText}</span>
                <br/><br/>
                <div>
                    <Button variant='contained' color='primary' startIcon={<SaveIcon/>}
                            onClick={onAddPosting}>Save</Button>&nbsp;&nbsp;
                    <Button variant='contained' color='default' startIcon={<UpdateIcon/>}
                            type='reset'>Reset</Button>&nbsp;&nbsp;
                    <Button variant='outlined' color='default' startIcon={<ListAltIcon/>}
                            onClick={()=>onSetPostingState("list")}>List</Button>
                </div>
            </form>
        )
    }
}

/*
    <form method="post" onSubmit={(e: any)=>{
        //submit이벤트 발생시 화면 새로고침 방지 //React.FormEvent<HTMLFormElement>
        e.preventDefault();

        onSetPostingProps('title', e.target.title.value);
        onSetPostingProps('writerEmail', e.target.writerEmail.value);
        onSetPostingProps('contents', e.target.contents.value);

        onAddPosting();
    }}>
* */

export default PostingWriteView;