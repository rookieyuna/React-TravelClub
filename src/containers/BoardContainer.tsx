import {Component} from "react";
import {inject, observer} from "mobx-react";
import {Grid, Typography} from "@material-ui/core";
import SearchbarContainer from "./SearchbarContainer";
import SocialBoard from "../entity/board/SocialBoard";
import BoardEditFormView from "../views/boardviews/BoardEditFormView";
import BoardListView from "../views/boardviews/BoardListView";
import TravelClub from "../entity/club/TravelClub";
import {IStoreProps} from "../stores/IStoreProps";


@inject('boardStore', 'clubStore', 'membershipStore')

@observer
class BoardContainer extends Component<IStoreProps>{

    clubProps = this.props.clubStore!;
    membershipProps = this.props.membershipStore!;
    boardProps = this.props.boardStore!;

    //input에 입력되는값 실시간으로 board 데이터에 업데이트
    onSetBoardProps(name: string,value: string){
        this.boardProps.setBoardProps(name, value);
    }
    //리스트에서 선택한 값(SocialBoard)으로 받아 현재 선택된 board로 변경
    onSelectedBoard(board: SocialBoard){
        this.boardProps.selectedBoard(board);
    }

    //업데이트 폼에서 등록버튼으로 돌아가기 위한 설정
    onSetBoardState(mode: boolean){
        this.boardProps.setBoardState(mode);
    }

    //클럽id로 TravelClub데이터 찾기
    onFindClub (clubId: string): TravelClub {
        let foundClub = this.clubProps.retrieve(clubId);
        if(!foundClub){
            throw new Error('Can\'t find the club with clubId');
        }
        return foundClub;
    }

    onAddBoard(): void{
        let boardStore = this.boardProps;
        //실시간저장 확인작업을 위한 console출력
        //console.log('Input name: '+ this.props.boardStore.board.name);
        //console.log('Input adminEmail: '+ this.props.boardStore.board.adminEmail);

        //클럽 선택 여부 확인작업
        if(!boardStore.board.clubId || boardStore.board.clubId.length===0){
            boardStore.setAlertText('Please choice club!');
            return;
        }
        //클럽id 등록 중복 여부 확인작업
        if(boardStore.retrieve(boardStore.board.clubId)){
            boardStore.setAlertText('This club board is already exist! Please check the lists.');
            return;
        }
        //보드이름 입력여부 확인작업
        if(!boardStore.board.name || boardStore.board.name.length===0){
            boardStore.setAlertText('Please input board name!');
            return;
        }
        //보드이름 중복을 방지하기 위한 확인작업
        if(boardStore.retrieveByName(boardStore.board.name)){
            boardStore.setAlertText('The board name is already exist!');
            return;
        }

        //보드이름 입력여부 확인작업
        if(!boardStore.board.adminEmail || boardStore.board.adminEmail.length===0){
            boardStore.setAlertText('Please input adminEmail!');
            return;
        }

        //adminEmail 존재 여부 확인작업
        if(!this.membershipProps.getMembership(boardStore.board.clubId, boardStore.board.adminEmail)){
            boardStore.setAlertText('The Admin Email is not registered in this club');
            return;
        }
        boardStore.addBoard();
    }

    onUpdateBoard() {
        let boardStore = this.boardProps;

        //adminEmail 존재 여부 확인작업
        if(!this.membershipProps.getMembership(boardStore.board.clubId, boardStore.board.adminEmail)){
            boardStore.setAlertText('The Admin Email is not registered in this club');
            return;
        }
        boardStore.updateBoard();
    }

    onRemoveBoard(board: SocialBoard){
        //삭제 재확인을 위한 confirm 단계
        if(window.confirm('Are you sure to delete board?')===true){
            this.boardProps.removeBoard(board);
        }
        else{
            alert('Delete cancelled');
        }
    }



    render() {

        let { clubs } = this.clubProps;
        let { board, boards, boardState, searchText, alertText } = this.boardProps;

        const searchBoard = Array.from(boards.values()).filter((searchBoard: SocialBoard) => searchBoard.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)

        return (
            <>
                <h1>Board Menu</h1>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <BoardEditFormView
                            clubs = {clubs} //클럽리스트 가져와서 전달 (select박스용)
                            board = {board}
                            boardState = {boardState} //입력폼 생성&수정 변경위한 값
                            alertText = {alertText}
                            onSetBoardProps = {this.onSetBoardProps.bind(this)}
                            onSetBoardState = {this.onSetBoardState.bind(this)}
                            onAddBoard = {this.onAddBoard.bind(this)}
                            onUpdateBoard = {this.onUpdateBoard.bind(this)}
                            onFindClub = {this.onFindClub.bind(this)}//클럽이름 찾기위한 함수 전달
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography display={"inline"}>Board Name: </Typography>&nbsp;<SearchbarContainer idx = {"board"} />
                        <BoardListView
                            boards = {searchBoard}
                            onSelectedBoard = {this.onSelectedBoard.bind(this)} //인풋태그 업데이트용 프롭스로 전달
                            onRemoveBoard = {this.onRemoveBoard.bind(this)} //삭제함수를 프롭스로 전달
                        />
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default BoardContainer;