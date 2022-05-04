import {observable, makeObservable, computed, toJS, action} from 'mobx';
import SocialBoard from "../entity/board/SocialBoard";

class BoardStore{

    //몹엑스6에서 필요한 부분(데코레이터 사용을 위해)
    constructor() {
        makeObservable(this);
    }

    @observable
    _board = {
        clubId: '',
        name: '',
        adminEmail: ''
        //createDate

    }; //id, name, adminEmail

    @observable
     _boards: SocialBoard[] = [];

    @observable
    _searchText = '';

    @observable //생성&수정 구분용 (true가 생성이고 기본값)
    _boardState: boolean = true;

    get board(){ //입력된 데이터 얻기
        return this._board;
    }

    @computed
    get boards(): SocialBoard[] { //클럽목록 get메서드
        return toJS(this._boards);
    }

    get searchText(){
        return this._searchText;
    }

    get boardState(){ //입력폼 생성/수정 상태값 얻기
        return this._boardState;
    }

    /**********************************************/

    //board 값 설정해주는 메서드
    @action
    setBoardProps(name: string, value: string){
        this._board = {
            ...this._board, //전개연산자
            [name] : value
        }
    }

    @action
    setSearchText(searchText: string){
        this._searchText = searchText;
    }


    //입력폼 생성/수정 상태값 변경
    @action
    setBoardState(mode: boolean): void{

        this._boardState = mode;

        if(mode === true){
            this._board = {
                clubId: '',
                name: '',
                adminEmail: ''
            }; //업데이트 하려고했던 데이터 비우기
        }
    }

    /***************************************
     ***************************************/

    //boards 목록에 board 데이터 SocialBoard 타입으로 저장
    @action
    addBoard(board: any): void {
        const newBoard = new SocialBoard(board.clubId, board.name, board.adminEmail);
        this._boards.push(newBoard);
        console.log('새 게시판 추가완료');

        this._board = {
            clubId: '',
            name: '',
            adminEmail: ''
        }; //등록 완료후 input 데이터 비우기

    };


    //clubId로 SocialBoard 찾기
    @action
     retrieve = (clubId: string):SocialBoard | null => {
        let foundBoard = this._boards.find((board)=> board.clubId === clubId);
        return foundBoard || null;
    };

    //boardName 으로 SocialBoard 찾기
    @action
    retrieveByName = (boardName: string):SocialBoard | null => {
        let foundBoard = this._boards.find((board)=> board.name === boardName);
        return foundBoard || null;
    }


    //선택한 SocialBoard 데이터로 현재 board 데이터가 변경되는 메서드 (업데이트 기능 수행용)
    @action
    selectedBoard(board: SocialBoard){
        this._board.clubId = board.clubId;
        this._board.name = board.name;
        this._board.adminEmail = board.adminEmail;

        this.setBoardState(false);
    }

    //선택된 SocialBoard 데이터 값을 입력된 값으로 업데이트 하기
    @action
    updateBoard(): void{
        let foundBoard = this.retrieve(this._board.clubId);

        if(foundBoard){ //일치하는 게시판 있을경우
            foundBoard.name = this._board.name; //선택된 board데이터를 현재 입력된 데이터로 변경
            foundBoard.adminEmail = this._board.adminEmail;

            this.setBoardState(true); //생성으로 입력창 상태값 변경

            //데이터가 업데이트되어도 List는 변경되는 데이터가 없어서 렌더링안됨(boardState 값을 보내서 해결)
        }
        else{
            alert('Sorry, board Update failed.');
        }
    }

    //선택된 SocialBoard 삭제하는 메서드
    @action
    removeBoard(board: SocialBoard):void {
        let foundBoardIndex = this._boards.findIndex((myBoard)=> myBoard.clubId === board.clubId); //findIndex로 인덱스까지 한번에 찾음
        if(foundBoardIndex > -1) {
            this._boards.splice(foundBoardIndex, 1);
        }
        //데이터 비우기
        this._board = {
            clubId: '',
            name: '',
            adminEmail: ''
        };
    }
}

export default new BoardStore();