import {Component} from "react";
import {inject, observer} from "mobx-react";
import {Grid, Typography} from "@material-ui/core";
import SearchbarContainer from "./SearchbarContainer";
import SocialBoard from "../entity/board/SocialBoard";
import boardStore from "../stores/BoardStore";
import PostingListView from "../views/postingviews/PostingListView";
import PostingDetailView from "../views/postingviews/PostingDetailView";
import Posting from "../entity/board/Posting";
import PostingWriteView from "../views/postingviews/PostingWriteView";
import PostingEditView from "../views/postingviews/PostingEditView";


@inject('boardStore', 'postingStore')

@observer
class PostingContainer extends Component<any>{

    //input에 입력되는값 posting 데이터에 업데이트
    onSetPostingProps(name: string,value: string){
        this.props.postingStore.setPostingProps(name, value);
    }

    //리스트에서 선택한 값(Posting)으로 받아 현재 선택된 posting으로 변경
    onSelectedPosting(posting: Posting){
        this.props.postingStore.selectedPosting(posting);
    }

    //posting list/detail/write/edit 모드 설정
    onSetPostingState(mode: string){
        this.props.postingStore.setPostingState(mode);
    }

    onReadCountAdd(){
        let postingId= this.props.postingStore.posting.postingId;
        this.props.postingStore.readCountAdd(postingId);
    }

    onAddPosting(): void{
        let { postingStore } = this.props;

        let paramId  = window.location.pathname.split('/')[2];

        //write Email 입력여부 확인작업
        if(!postingStore.posting.writerEmail || postingStore.posting.writerEmail.length===0){
            alert('Please input the writer email!');
            return;
        }
        //title 입력여부 확인작업
        if(!postingStore.posting.title || postingStore.posting.title.length===0){
            alert('Please input the posting title!');
            return;
        }
        //contents 입력여부 확인작업
        if(!postingStore.posting.contents || postingStore.posting.contents.length===0){
            alert('Please input the posting contents!');
            return;
        }
        const targetBoard: SocialBoard = this.props.boardStore.retrieve(paramId);

        postingStore.addPosting(postingStore.posting, targetBoard);

        //입력완료되면 컴포넌트 mode list로 변경
        this.onSetPostingState('list');
    }

    onUpdatePosting() {
        let { postingStore } = this.props;

        postingStore.updatePosting();
    }

    onRemovePosting(postingId: string){
        //삭제 재확인을 위한 confirm 단계
        if(window.confirm('Are you sure to delete Posting?')===true){
            this.props.postingStore.removePosting(postingId);
        }
        else{
            alert('Delete cancelled');
        }
    }

    //현재주소에 해당하는 보드데이터 보내줘야함! 보드데이터 찾는 함수 만들기



    render() {

        let { posting, postings, postingState, searchText } = this.props.postingStore;
        postings = postings.filter((searchPosting: Posting) => searchPosting.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)

        let _article = null; //렌더링할때 postingState에 따라 return할 view컴포넌트를 구분하기 위한 임시변수


        // posting list 컴포넌트
        if(postingState==="list"){
            _article =
                <Grid item xs={10}>
                    <SearchbarContainer idx = {"posting"} />
                    <PostingListView
                        postings = {postings}
                        postingState = {postingState} //입력폼 생성&수정 변경위한 값
                        onSelectPosting = {this.onSelectedPosting.bind(this)} //인풋태그 업데이트용 프롭스로 전달
                        onSetPostingState = {this.onSetPostingState.bind(this)}
                        onSelectedPosting = {this.onSelectedPosting.bind(this)}
                        onReadCountAdd = {this.onReadCountAdd.bind(this)} // 조회수 증가시켜주는 함수
                    />
                </Grid>
        }

        // posting write 컴포넌트
        else if(postingState==="write"){
            _article =
                <Grid item xs={10}>
                    <PostingWriteView
                        posting = {posting}
                        postingState = {postingState} //입력폼 생성&수정 변경위한 값
                        onSetPostingProps = {this.onSetPostingProps.bind(this)}
                        onSetPostingState = {this.onSetPostingState.bind(this)}
                        onAddPosting = {this.onAddPosting.bind(this)}
                    />
                </Grid>
        }

        // posting detail 컴포넌트
        else if(postingState==="detail"){
            _article =
                <Grid item xs={10}>
                    <PostingDetailView
                        posting = {posting}
                        postingState = {postingState} //입력폼 생성&수정 변경위한 값
                        onSetPostingProps = {this.onSetPostingProps.bind(this)}
                        onSetPostingState = {this.onSetPostingState.bind(this)}
                        onAddPosting = {this.onAddPosting.bind(this)}
                        onRemovePosting = {this.onRemovePosting.bind(this)}
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
        let boardName = this.props.boardStore.retrieve(paramId).name;

        return (
        <>
            <h1>Posting for Board Name "{boardName}" </h1>
            <Grid container justifyContent='center'>
                {_article}
            </Grid>
        </>
        )
    }
}

export default PostingContainer;