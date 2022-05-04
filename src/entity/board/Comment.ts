import DateUtil from "../../util/DateUtil";
import Entity from "../Entity";

class Comment implements Entity {
    //
    commentId: string = '';
    postingId: string = '';
    writer: string = '';
    contents: string = '';
    writtenDate: string = ''

    editMode: boolean = false;



    constructor(commentId: string, postingId: string, writer: string, contents: string) {
        this.commentId = commentId;
        this.postingId = postingId;
        this.writer = writer;
        this.contents = contents;
        this.writtenDate = DateUtil.today();
    }

    getId(): string {
        return this.commentId;
    }
}

export default Comment;