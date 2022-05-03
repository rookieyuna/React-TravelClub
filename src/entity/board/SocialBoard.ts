import Entity from "../Entity";
import DateUtil from "../../util/DateUtil";
import TravelClub from "../club/TravelClub";
import CommunityMember from "../club/CommunityMember";

class SocialBoard implements Entity {
    //
    clubId: string = '';
    name: string = ''
    adminEmail: string = '';
    createDate: string = '';

    sequence: number = 0;

    constructor(clubId: string, name: string, adminEmail: string) {
        //
        this.clubId = clubId;
        this.name = name;
        this.adminEmail = adminEmail;
        this.createDate =DateUtil.today();
    }

    getId(): string {
        return this.clubId;
    }

    get nextPostingId(): string {
        return `${this.clubId}: ${this.sequence++}`;
    }
}

export default SocialBoard;