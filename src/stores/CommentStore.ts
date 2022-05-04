import {observable, makeObservable, computed, toJS, action} from 'mobx';
import Comment from "../entity/board/Comment";
import Posting from "../entity/board/Posting";

class CommentStore{

    //몹엑스6에서 필요한 부분(데코레이터 사용을 위해)
    constructor() {
        makeObservable(this);
    }

    @observable
    _comment = {
        commentId : '',
        postingId : '',
        writer : '',
        contents: ''
        //writtenDate
    };

    @observable
    _comments : Comment[] = [];

    @observable //생성&수정 구분용 (true가 생성이고 기본값)
    _commentState: boolean = true;


    get comment(){ //입력된 데이터 얻기
        return this._comment;
    }

    @computed
    get comments(): Comment[] { //댓글 목록 get메서드
        return toJS(this._comments);
    }

    get commentState(){ //입력폼 생성/수정 상태값 얻기
        return this._commentState;
    }


    /**********************************************/

    //comment 값 설정해주는 메서드
    @action
    setCommentProps(name: string, value: string){
        this._comment = {
            ...this._comment, //전개연산자
            [name] : value
        }
    }

    //입력폼 생성/수정 상태값 변경
    @action
    setCommentState(mode: boolean): void{
        this._commentState = mode;

        if(mode === true){
            this._comment = {
                commentId : '',
                postingId : '',
                writer : '',
                contents: '',
            }; //업데이트 하려고했던 데이터 비우기
        }
    }

    /************************************************
     *************************************************/


    //comments 목록에 comment 데이터 Comment 타입으로 저장
    @action
    addComment(comment: any, posting:Posting): void {

        let commentId = posting.nextCommentId; //댓글이 등록될 Posting 정보 넘겨받아서 nextCommentId 사용
        const newComment = new Comment(commentId, posting.postingId, comment.writer, comment.contents);
        this._comments.push(newComment);
        console.log('새 댓글 추가완료');

        this._comment = {
            commentId : '',
            postingId : '',
            writer : '',
            contents: ''
        };  //등록 완료후 데이터 비우기
    };

    //commentId로 Comment 찾기
    retrieve = (commentId: string):Comment | null => {
        let foundComment = this._comments.find((comment)=> comment.commentId === commentId);
        return foundComment || null;
    };

    //선택한 Comment 데이터로 현재 comment 데이터가 변경되는 메서드 (업데이트 버튼 클릭 시)
    @action
    selectedComment(comment: Comment){
        this._comment.commentId = comment.commentId;
        this._comment.postingId = comment.postingId;
        this._comment.writer = comment.writer;
        this._comment.contents = comment.contents;

        this.setCommentState(false);
    }

    //선택된 Comment 데이터 변경 메서드
    @action
    updateComment(): void{
        let foundComment = this.retrieve(this._comment.commentId);

        if(foundComment){ //일치하는 댓글 있을경우

            foundComment.writer = this._comment.writer;
            foundComment.contents = this._comment.contents;

            this.setCommentState(true); //생성으로 입력창 상태값 변경

            //데이터가 업데이트되어도 List는 변경되는 데이터가 없어서 렌더링안됨(CommentState 값을 보내서 해결)
        }
        else{
            alert('Sorry, comment Update failed.');
        }
    }

    //선택된 Comment 삭제하는 메서드
    @action
    removeComment(comment: Comment):void {

        let foundComment = this.retrieve(comment.commentId);
        if(foundComment){
            const membershipIdx = this._comments.indexOf(foundComment);
            if(membershipIdx > -1) {
                this._comments.splice(membershipIdx, 1);
            }
        }
    }
}

export default new CommentStore();