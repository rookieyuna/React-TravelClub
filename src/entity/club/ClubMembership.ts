import RoleInClub from "./RoleInClub";
import DateUtil from "../../util/DateUtil";
import TravelClub from "./TravelClub";
import CommunityMember from "./CommunityMember";

class ClubMembership {
    //
    clubId: string = '';
    memberEmail: string = '';
    role: RoleInClub = RoleInClub.Member;
    joinDate: string = '';

    constructor(clubId: string, memberEmail: string) {
        //
        this.clubId = clubId;
        this.memberEmail = memberEmail;

        this.joinDate = DateUtil.today();
    }
}

export default ClubMembership;