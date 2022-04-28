import DateUtil from "../../util/DateUtil";
import Entity from "../Entity";

class Comment implements Entity {
    //
    usid: string = '';
    writer: string = '';
    contents: string = '';
    writtenDate: string = '';

    postingId: string = '';

    constructor(commentId: string, postingId: string, writer: string, contents: string) {
        this.usid = commentId;
        this.postingId = postingId;
        this.writer = writer;
        this.contents = contents;
        this.writtenDate = DateUtil.today();
    }

    getId(): string {
        return this.usid;
    }
}

export default Comment;