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
        //submit하면 각 입력태그의 데이터를 posting observable 에 저장후 add 메서드 실행
        const {onSetPostingProps, onSetPostingState, onAddPosting} = this.props;

        return (
            <form method="post" onSubmit={(e: any)=>{
                //submit이벤트 발생시 화면 새로고침 방지
                e.preventDefault();

                onSetPostingProps('title', e.target.title.value);
                onSetPostingProps('writerEmail', e.target.writerEmail.value);
                onSetPostingProps('contents', e.target.contents.value);

                onAddPosting();
            }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell align='center'>Writer Email</TableCell>
                                <TableCell>
                                    <Input type="text" name="writerEmail" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'>Title</TableCell>
                                <TableCell>
                                    <Input type="text" name="title" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'>Contents</TableCell>
                                <TableCell >
                                    <TextField
                                        name="contents"
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
                <br/>
                <div>

                    <Button variant='contained' color='primary' startIcon={<SaveIcon/>}
                            type='submit'>Save</Button>&nbsp;&nbsp;
                    <Button variant='contained' color='default' startIcon={<UpdateIcon/>}
                            type='reset'>Reset</Button>&nbsp;&nbsp;
                    <Button variant='contained' color='default' startIcon={<ListAltIcon/>}
                            onClick={()=>onSetPostingState("list")}>List</Button>
                </div>
            </form>
        )
    }
}

export default PostingWriteView;