import React, {Component} from "react";
import {IClub} from "../stores/ClubStore";

import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import {observer} from "mobx-react";

import moment from 'moment';

@observer
class ClubListView extends Component<any, any>{


    render() {

        const {clubs} = this.props;

        let clubList : IClub[] = clubs;

        return (
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Club Id</TableCell>
                            <TableCell align='center'>Club Name</TableCell>
                            <TableCell align='center'>Club Intro</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                        /*
                        //몹엑스4버전에서는 배열이아닌 유사배열을 쓰므로 배열여부를 확인하는 Array.isArray 쓰면 출력안됨
                         */
                        Array.isArray(clubList) && clubList.length ?
                        clubList.map( (club ) => (
                            <TableRow key={club.clubId} hover>
                                <TableCell align='center'>{club.clubId}</TableCell>
                                <TableCell align='center'>{club.clubName}</TableCell>
                                <TableCell align='center'>{club.clubIntro}</TableCell>
                            </TableRow>
                        ))
                        : //데이터가 없는경우 Empty로 나오도록 설정
                            <TableRow>
                                <TableCell>Empty</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

}

export default ClubListView;