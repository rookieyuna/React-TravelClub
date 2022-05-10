import {observable, makeObservable, computed, toJS, action} from 'mobx';
import Posting from "../entity/board/Posting";
import SocialBoard from "../entity/board/SocialBoard";
import memoryMap from "./io/MemoryMap";

interface IPosting {
    postingId: string,
    boardId: string,
    title: string,
    writerEmail: string,
    contents: string
}

class PostingStore{

    //몹엑스6에서 필요한 부분(데코레이터 사용을 위해)
    constructor() {
        makeObservable(this);
    }

    @observable
    _posting: IPosting = {
        postingId: '',
        boardId: '',
        title: '',
        writerEmail: '',
        contents: ''
        //createDate
    };

    @observable
    _postings: Map<string, Posting> = memoryMap.getInstance().postingMap;

    @observable
    _searchText = '';

    @observable
    _alertText = '';

    @observable //list/detail/write/edit 구분용
    _postingState: string = "list"; //기본값 list


    get posting(){ //입력된 데이터 얻기
        return this._posting;
    }

    @computed
    get postings(): Map<string, Posting> { //클럽목록 get메서드
        return toJS(this._postings);
    }

    get searchText(){
        return this._searchText;
    }

    get alertText(){
        return this._alertText;
    }

    get postingState(){ //입력폼 생성/수정 상태값 얻기
        return this._postingState;
    }

    /**********************************************/

    //posting 값 설정해주는 메서드
    @action
    setPostingProps(name: string, value: string){
        this._posting = {
            ...this._posting, //전개연산자
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

    //postingState list/detail/write/edit 상태값변경용 setter
    @action
    setPostingState(mode: string): void{
        this._postingState = mode;
    }


    /************************************************/

    //postings 목록에 posting 데이터 Posting 타입으로 저장
    @action
    addPosting(posting: any, board:SocialBoard): void {

        let postingId = board.nextPostingId; //글이 등록될 Board객체 정보 넘겨받아서 nextPostingId 사용
        const newPosting = new Posting(postingId, board.clubId, posting.title, posting.writerEmail, posting.contents);
        this._postings.set(postingId, newPosting);
        console.log('새 게시글 추가완료');

        this._posting = {
            postingId: '',
            boardId: '',
            title: '',
            writerEmail: '',
            contents: ''
        }; //등록 완료후 데이터 비우기
        this._alertText='';
    };

    //조회수 증가시키는 함수
    @action
    readCountAdd(postingId: string): void{
        let foundPosting = this.retrieve(postingId);
        if(foundPosting){
            foundPosting.readCount++;
        }
    }

    //postingId로 Posting 찾기
    @action
     retrieve = (postingId: string):Posting | null => {
        let foundPosting = this._postings.get(postingId);
        return foundPosting || null;
    };

    //boardId 로 PostingList 찾기
    @action
    retrieveByBoardId = (boardId: string): Posting[] | null => {

        let postings = Array.from(this._postings.values());
        return postings.filter(posting => posting.boardId === boardId);
    }

    //선택한 Posting 데이터로 현재 posting 데이터가 변경되는 메서드 (업데이트 기능 수행용)
    @action
    selectedPosting(posting: Posting){
        this._posting.postingId = posting.postingId;
        this._posting.boardId = posting.boardId;
        this._posting.title = posting.title;
        this._posting.writerEmail = posting.writerEmail;
        this._posting.contents = posting.contents;
    }

    //선택된 Posting 데이터 값을 입력된 값으로 업데이트 하기
    @action
    updatePosting(): void{
        let foundPosting = this.retrieve(this._posting.postingId);

        if(foundPosting){ //일치하는 게시글 있을경우 선택된 posting 데이터를 현재 입력된 데이터로 변경
            foundPosting.title = this._posting.title;
            foundPosting.writerEmail = this._posting.writerEmail;
            foundPosting.contents = this._posting.contents;

            this._postings.set(this._posting.postingId, foundPosting);

            this._posting = {
                postingId: '',
                boardId: '',
                title: '',
                writerEmail: '',
                contents: ''
            }; //업데이트 완료후 데이터 비우기

            this._alertText= '';
        }
        else{
            alert('Sorry, posting modify failed.');
        }
    }

    //선택된 posting 삭제하는 메서드
    @action
    removePosting(postingId: string):void {

        this._postings.delete(postingId);

        this._posting = {
            postingId: '',
            boardId: '',
            title: '',
            writerEmail: '',
            contents: ''
        }//데이터 비우기
    }
}

export default new PostingStore();