import Entity from "../Entity";
import ClubMembership from "./ClubMembership";
import Address from "./Address";

class CommunityMember implements Entity {
    //
    email: string = '';
    name: string = '';
    nickName: string = '';
    phoneNumber: string = '';
    birthDay: string = '';

    addresses: Address[] = [];
    membershipList: ClubMembership[] = [];

    constructor(email: string, name: string, phoneNumber: string) {
        //
        this.email = email;
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    getId(): string {
        return this.email;
    }

    static getSample(): CommunityMember {
        //
        const member = new CommunityMember('namoosori@test..co.kr', 'Lee', '010-0001-1111');

        member.nickName = 'Mr.Lee';
        member.birthDay = '2000.01.01';
        member.addresses.push(Address.getHomeAddressSample());

        return member;
    }
}

export default CommunityMember;