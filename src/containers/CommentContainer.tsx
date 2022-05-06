import {Component} from "react";
import {inject, observer} from "mobx-react";
import {Grid, Typography} from "@material-ui/core";
import CommentListView from "../views/commentviews/CommentListView";
import Comment from "../entity/board/Comment";
import Posting from "../entity/board/Posting";
import commentStore from "../stores/CommentStore";
import CommentEditFormView from "../views/commentviews/CommentEditFormView";
import {IStoreProps} from "../stores/IStoreProps";


@inject('commentStore', 'postingStore')
@observer
class CommentContainer extends Component<IStoreProps>{

    postingProps = this.props.postingStore!;
    commentProps = this.props.commentStore!;

    //input에 입력되는값 실시간으로 comment 데이터에 업데이트
    onSetCommentProps(name: string,value: string){

        this.commentProps.setCommentProps(name, value);
    }
    //리스트에서 선택한 값(Comment)으로 받아 현재 선택된 comment 로 변경
    onSelectedComment(comment: Comment){
        this.commentProps.selectedComment(comment);
    }


    onAddComment(): void{

        let  commentStore = this.commentProps;

        //writer 입력 유효성 검증
        if(!commentStore.comment.writer || commentStore.comment.writer.length===0){
            alert('Please input comment writer!');
            return;
        }
        //contents 입력 유효성 검증
        if(!commentStore.comment.contents || commentStore.comment.contents.length===0){
            alert('Please input comment contents!');
            return;
        }

        let postingStore = this.postingProps;
        const targetPosting: Posting | null = postingStore.retrieve(postingStore.posting.postingId);

        if(targetPosting){
            commentStore.addComment(targetPosting);
        }
        else{
            alert('Can\'t find the posting to add a comment');
        }
    }

    onUpdateComment(){

        //writer 입력 유효성 검증
        if(!commentStore.comment.writer || commentStore.comment.writer.length===0){
            alert('Please input comment writer!');
            return;
        }
        //contents 입력 유효성 검증
        if(!commentStore.comment.contents || commentStore.comment.contents.length===0){
            alert('Please input comment contents!');
            return;
        }
        this.commentProps.updateComment();
    }

    onRemoveComment(comment: Comment){
        //삭제 재확인을 위한 confirm 단계
        if(window.confirm('Are you sure to delete comment?')===true){
            this.commentProps.removeComment(comment);
        }
        else{
            alert('Delete cancelled');
        }
    }


    render() {

        let { comment, comments, commentState } = this.commentProps;
        let postingStore = this.postingProps;

        const paramId: string = postingStore.retrieve(postingStore.posting.postingId)!.postingId;

        return (
            <>
                <Grid>
                    <CommentListView
                        comments = {comments}
                        paramId = {paramId}
                        onSelectedComment = {this.onSelectedComment.bind(this)}
                        onRemoveComment = {this.onRemoveComment.bind(this)}
                    />
                    <br/>
                    <CommentEditFormView
                        comment = {comment}
                        commentState = {commentState}
                        onSetCommentProps = {this.onSetCommentProps.bind(this)}
                        onAddComment = {this.onAddComment.bind(this)}
                        onUpdateComment = {this.onUpdateComment.bind(this)}
                    />
                </Grid>
            </>
        )
    }
}

export default CommentContainer;