import {Component} from "react";
import {inject, observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import SearchbarContainer from "./SearchbarContainer";
import SocialBoard from "../entity/board/SocialBoard";
import boardStore from "../stores/BoardStore";
import PostingListView from "../views/postingviews/PostingListView";
import PostingDetailView from "../views/postingviews/PostingDetailView";
import Posting from "../entity/board/Posting";
import PostingWriteView from "../views/postingviews/PostingWriteView";
import PostingEditView from "../views/postingviews/PostingEditView";
import CommentContainer from "./CommentContainer";
import {IStoreProps} from "../stores/IStoreProps";


@inject('boardStore', 'postingStore')

@observer
class PostingContainer extends Component<IStoreProps>{

    boardProps = this.props.boardStore!;
    postingProps = this.props.postingStore!;

    //input에 입력되는값 posting 데이터에 업데이트
    onSetPostingProps(name: string,value: string){
        this.postingProps.setPostingProps(name, value);
    }

    //리스트에서 선택한 값(Posting)으로 받아 현재 선택된 posting으로 변경
    onSelectedPosting(posting: Posting){
        this.postingProps.selectedPosting(posting);
    }

    //posting list/detail/write/edit 모드 설정
    onSetPostingState(mode: string){
        this.postingProps.setPostingState(mode);
    }

    onReadCountAdd(){
        let postingId= this.postingProps.posting.postingId;
        this.postingProps.readCountAdd(postingId);
    }

    onAddPosting(): void{
        let postingStore = this.postingProps;

        let paramId  = window.location.pathname.split('/')[2];

        //write Email 입력여부 확인작업
        if(!postingStore.posting.writerEmail || postingStore.posting.writerEmail.length===0){
            postingStore.setAlertText('Please input the writer email!');
            return;
        }
        //title 입력여부 확인작업
        if(!postingStore.posting.title || postingStore.posting.title.length===0){
            postingStore.setAlertText('Please input the posting title!');
            return;
        }
        //contents 입력여부 확인작업
        if(!postingStore.posting.contents || postingStore.posting.contents.length===0){
            postingStore.setAlertText('Please input the posting contents!');
            return;
        }
        const targetBoard: SocialBoard = this.boardProps.retrieve(paramId)!;

        postingStore.addPosting(postingStore.posting, targetBoard);

        //입력완료되면 컴포넌트 mode list로 변경
        this.onSetPostingState('list');
    }

    onUpdatePosting() {

        let postingStore = this.postingProps;

        //write Email 입력여부 확인작업
        if(!postingStore.posting.writerEmail || postingStore.posting.writerEmail.length===0){
            postingStore.setAlertText('Please input the writer email!');
            return;
        }
        //title 입력여부 확인작업
        if(!postingStore.posting.title || postingStore.posting.title.length===0){
            postingStore.setAlertText('Please input the posting title!');
            return;
        }
        //contents 입력여부 확인작업
        if(!postingStore.posting.contents || postingStore.posting.contents.length===0){
            postingStore.setAlertText('Please input the posting contents!');
            return;
        }

        postingStore.updatePosting();
    }

    onRemovePosting(postingId: string){
        //삭제 재확인을 위한 confirm 단계
        if(window.confirm('Are you sure to delete Posting?')===true){
            this.postingProps.removePosting(postingId);
        }
        else{
            alert('Delete cancelled');
        }
    }

    //현재주소에 해당하는 보드데이터 보내줘야함! 보드데이터 찾는 함수 만들기



    render() {

        let { posting, postings, alertText, postingState, searchText } = this.postingProps;
        let searchPostings = Array.from(postings.values()).filter((searchPosting: Posting) => searchPosting.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)

        let _article = null; //렌더링할때 postingState에 따라 return할 view컴포넌트를 구분하기 위한 임시변수


        // posting list 컴포넌트
        if(postingState==="list"){
            _article =
                <Grid item xs={10}>
                    <SearchbarContainer idx = {"posting"} />
                    <PostingListView
                        postings = {searchPostings}
                        onSetPostingState = {this.onSetPostingState.bind(this)}
                        onSelectedPosting = {this.onSelectedPosting.bind(this)}//인풋태그 업데이트용 프롭스로 전달
                        onReadCountAdd = {this.onReadCountAdd.bind(this)} // 조회수 증가시켜주는 함수
                    />
                </Grid>
        }

        // posting detail 컴포넌트
        else if(postingState==="detail"){
            _article =
                <Grid item xs={10}>
                    <PostingDetailView
                        posting = {posting}
                        onSetPostingState = {this.onSetPostingState.bind(this)}
                        onRemovePosting = {this.onRemovePosting.bind(this)}
                    />
                    <br/>
                    <h3>Comment</h3>
                    <CommentContainer/>
                </Grid>
        }

        // posting write 컴포넌트
        else if(postingState==="write"){
            _article =
                <Grid item xs={10}>
                    <PostingWriteView
                        alertText = {alertText}
                        onSetPostingProps = {this.onSetPostingProps.bind(this)}
                        onSetPostingState = {this.onSetPostingState.bind(this)}
                        onAddPosting = {this.onAddPosting.bind(this)}
                    />
                </Grid>
        }

        // posting edit 컴포넌트
        else if(postingState==="edit"){
            _article =
                <Grid item xs={10}>
                    <PostingEditView
                        posting = {posting}
                        onSetPostingProps = {this.onSetPostingProps.bind(this)}
                        onSetPostingState = {this.onSetPostingState.bind(this)}
                        onUpdatePosting = {this.onUpdatePosting.bind(this)}
                    />
                </Grid>
        }

        let paramId  = window.location.pathname.split('/')[2]; //boardId 파라미터 저장
        let boardName = this.boardProps.retrieve(paramId)!.name;

        return (
        <>
            <h1>Posting for Board Name "{boardName}" </h1>
            <Grid container justifyContent='center'>
                {_article}
            </Grid>
        </>
        )
    }

    componentWillUnmount() {
        //글 읽기/쓰기/수정 중 컴포넌트 종료되면 다시 컴포넌트 켤 때 그대로 유지되므로 종료 시 state를 list로 변경하여 리셋되도록 설정
        this.onSetPostingState('list');
    }
}

export default PostingContainer;