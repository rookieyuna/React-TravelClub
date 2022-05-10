import TravelClub from "../../entity/club/TravelClub";
import CommunityMember from "../../entity/club/CommunityMember";
import SocialBoard from "../../entity/board/SocialBoard";
import Posting from "../../entity/board/Posting";
import Comment from "../../entity/board/Comment";
import ClubMembership from "../../entity/club/ClubMembership";

class MemoryMap {

    private static uniqueInstance: MemoryMap;

    clubMap: Map<string, TravelClub>;
    memberMap: Map<string, CommunityMember>;
    membershipMap:Map<string, ClubMembership>;
    boardMap: Map<string, SocialBoard>;
    postingMap: Map<string, Posting>;
    commentMap: Map<string, Comment>;

    private constructor() {

        this.clubMap = new Map<string, TravelClub>();
        this.memberMap = new Map<string, CommunityMember>();
        this.membershipMap = new Map<string, ClubMembership>();
        this.boardMap = new Map<string, SocialBoard>();
        this.postingMap = new Map<string, Posting>();
        this.commentMap = new Map<string, Comment>();
    }

    static getInstance(): MemoryMap {
        if(this.uniqueInstance === undefined){
            this.uniqueInstance = new MemoryMap();
        }
        return this.uniqueInstance;
    }
}

export default MemoryMap;

