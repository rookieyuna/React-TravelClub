import BoardStore from "./BoardStore";
import ClubStore from "./ClubStore";
import MembershipStore from "./MembershipStore";
import MemberStore from "./MemberStore";
import PostingStore from "./PostingStore";
import CommentStore from "./CommentStore";

export interface IStoreProps {

    // ? : 옵셔널(Optional) / 선택적 프로퍼티 문법 => 필수로 값을 할당하지 않도록 설정하는 경우 사용

    clubStore?: typeof ClubStore;
    memberStore?: typeof MemberStore;
    membershipStore?: typeof MembershipStore;
    boardStore?: typeof BoardStore;
    postingStore?: typeof PostingStore;
    commentStore?: typeof CommentStore;

    idx?: string; //searchContainer
}