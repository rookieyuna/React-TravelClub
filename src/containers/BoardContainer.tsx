import {Component} from "react";
import {inject, observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import autobind from "autobind-decorator";
import SearchbarContainer from "./SearchbarContainer";
import SocialBoard from "../entity/board/SocialBoard";
import BoardEditFormView from "../views/boardviews/BoardEditFormView";
import BoardListView from "../views/boardviews/BoardListView";
import TravelClub from "../entity/club/TravelClub";
import boardStore from "../stores/BoardStore";


@inject('boardStore', 'clubStore', 'membershipStore')

@observer
class BoardContainer extends Component<any, any>{

    //input에 입력되는값 실시간으로 board 데이터에 업데이트
    onSetBoardProps(name: string,value: string){
        this.props.boardStore.setBoardProps(name, value);
    }
    //리스트에서 선택한 값(SocialBoard)으로 받아 현재 선택된 board로 변경
    onSelectedBoard(board: SocialBoard){
        this.props.boardStore.selectedBoard(board);
    }

    //업데이트 폼에서 등록버튼으로 돌아가기 위한 설정
    onSetBoardStateToAdd(){
        this.props.boardStore.setBoardStateToAdd();
    }

    //클럽id로 TravelClub데이터 찾기
    onFindClub (clubId: string): TravelClub {
        let foundClub = this.props.clubStore.retrieve(clubId);
        return foundClub;
    }

    onAddBoard(): void{
        let { boardStore } = this.props;
        //실시간저장 확인작업을 위한 console출력
        //console.log('Input name: '+ this.props.boardStore.board.name);
        //console.log('Input adminEmail: '+ this.props.boardStore.board.adminEmail);

        //보드이름 입력여부 확인작업
        if(!boardStore.board.name || boardStore.board.name.length===0){
            alert('Please input board name!');
            return;
        }
        //보드이름 중복을 방지하기 위한 확인작업
        if(boardStore.retrieveByName(boardStore.board.name)){
            alert('The board name is already exist!');
            return;
        }
        //클럽id 등록 중복 여부 확인작업
        if(boardStore.retrieve(boardStore.board.clubId)){
            alert('This club board is already exist!');
            return;
        }
        /*
        //adminEmail 존재 여부 확인작업
        if(!this.props.membershipStore.getMembership(boardStore.board.clubId, boardStore.board.adminEmail)){
            alert('The Admin Email is not registered in this club');
            return;
        }*/


            boardStore.addBoard(boardStore.board);

    }

    onUpdateBoard() {
        let { boardStore } = this.props;

        //adminEmail 존재 여부 확인작업
        if(!this.props.membershipStore.getMembership(boardStore.board.clubId, boardStore.board.adminEmail)){
            alert('The Admin Email is not registered in this club');
            return;
        }
        boardStore.updateBoard();
    }

    onRemoveBoard(board: SocialBoard){
        //삭제 재확인을 위한 confirm 단계
        if(window.confirm('Are you sure to delete board?')===true){
            this.props.boardStore.removeBoard(board);
        }
        else{
            alert('Delete cancelled');
        }
    }



    render() {

        let { clubs } = this.props.clubStore;
        let { board, boards, boardState, searchText } = this.props.boardStore;

        boards = boards.filter((searchBoard: SocialBoard) => searchBoard.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)

        return (
        <>
            <h1>Board Menu</h1>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <BoardEditFormView
                        clubs = {clubs} //클럽리스트 가져와서 전달 (select박스용)
                        board = {board}
                        boardState = {boardState} //입력폼 생성&수정 변경위한 값
                        onSetBoardProps = {this.onSetBoardProps.bind(this)}
                        onSetBoardStateToAdd = {this.onSetBoardStateToAdd.bind(this)}
                        onAddBoard = {this.onAddBoard.bind(this)}
                        onUpdateBoard = {this.onUpdateBoard.bind(this)}
                        onFindClub = {this.onFindClub.bind(this)}//클럽이름 찾기위한 함수 전달
                    />
                </Grid>
                <Grid item xs={9}>
                    <SearchbarContainer />
                    <BoardListView
                        boards = {boards}
                        boardState = {boardState} //입력폼 생성&수정 변경위한 값
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