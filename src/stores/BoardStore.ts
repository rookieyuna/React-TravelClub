import {observable, makeObservable, computed, toJS, action} from 'mobx';
import SocialBoard from "../entity/board/SocialBoard";
import MemoryMap from "./io/MemoryMap";


export interface IBoard{
    clubId: string;
    name: string;
    adminEmail: string;
}

class BoardStore{

    //몹엑스6에서 필요한 부분(데코레이터 사용을 위해)
    constructor() {
        makeObservable(this);
    }

    @observable
    _board: IBoard = {
        clubId: '',
        name: '',
        adminEmail: ''
        //createDate
    }; //id, name, adminEmail

    @observable
     _boards: Map<string, SocialBoard> = MemoryMap.getInstance().boardMap;

    @observable
    _searchText = '';

    @observable
    _alertText = '';

    @observable //생성&수정 구분용 (true가 생성이고 기본값)
    _boardState: boolean = true;

    get board(){ //입력된 데이터 얻기
        return this._board;
    }

    @computed
    get boards(): Map<string, SocialBoard> { //클럽목록 get메서드
        return toJS(this._boards);
    }

    get searchText(){
        return this._searchText;
    }

    get alertText(){
        return this._alertText;
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

    @action
    setAlertText(alertText: string){
        this._alertText = alertText;
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
    addBoard(): void {
        const board = this._board;
        const newBoard = new SocialBoard(board.clubId, board.name, board.adminEmail);
        this._boards.set(newBoard.clubId, newBoard);
        console.log('새 게시판 추가완료');

        this._alertText = '';

        this._board = {
            clubId: '',
            name: '',
            adminEmail: ''
        }; //등록 완료후 input 데이터 비우기

    };


    //clubId로 SocialBoard 찾기
    @action
     retrieve = (clubId: string):SocialBoard | null => {
        let foundBoard = this._boards.get(clubId);
        return foundBoard || null;
    };

    //boardName 으로 SocialBoard 찾기
    @action
    retrieveByName = (boardName: string):SocialBoard | null => {

        let foundBoard = Array.from(this._boards.values()).find((board)=> board.name === boardName);
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

            this._boards.set(foundBoard.getId(), foundBoard);

            this.setBoardState(true); //생성으로 입력창 상태값 변경
            this._alertText = '';

        }
        else{
            alert('Sorry, board Update failed.');
        }
    }

    //선택된 SocialBoard 삭제하는 메서드
    @action
    removeBoard(board: SocialBoard):void {

        this._boards.delete(board.getId());

        //데이터 비우기
        this._board = {
            clubId: '',
            name: '',
            adminEmail: ''
        };
    }
}

export default new BoardStore();