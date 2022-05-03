import Entity from "../Entity";
import DateUtil from "../../util/DateUtil";
import SocialBoard from "./SocialBoard";
import CommunityMember from "../club/CommunityMember";

class Posting implements Entity {
    //
    postingId: string = '';
    boardId: string = '';
    title: string = '';
    writerEmail: string = '';
    contents: string = '';
    writtenDate: string = '';
    readCount: number = 0;

    sequence: number = 0;


    constructor(postingId: string, boardId: string, title: string, writerEmail: string, contents: string) {
        this.postingId = postingId;
        this.boardId = boardId;
        this.title = title;
        this.writerEmail = writerEmail;
        this.contents = contents;
        this.writtenDate = DateUtil.today();
    }

    getId(): string {
        return this.postingId;
    }

    get nextCommentId(): string {
        return `${this.postingId} : ${this.sequence++}`;
    }
}

export default Posting;