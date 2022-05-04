import AutoIdEntity from "../AutoIdEntity";
import DateUtil from "../../util/DateUtil";
import ClubMembership from "./ClubMembership";

class TravelClub implements AutoIdEntity{

    private readonly MINIMUM_NAME_LENGTH: number = 3;
    private readonly MINIMUM_INTRO_LENGTH: number = 10;

    clubId: string = '';
    name: string = '';
    intro: string = '';
    foundationDate: string = '';

    membershipList: ClubMembership[] = [];

    constructor(name: string, intro:string) {
        //
        //this.setName(name);
        //this.setIntro(intro);
        this.name = name;
        this.intro = intro;
        this.foundationDate = DateUtil.today();
    }

    getId(): string {
        //
        return this.clubId;
    }

    setAutoId(autoId: string): void {
        //
        this.clubId = autoId;
    }

    getMembershipBy(email: string): ClubMembership | null {
        //
        if (!email || !email.length){
            return null;
        }

        let clubMembership;

        for (clubMembership of this.membershipList){
            if(email === clubMembership.memberEmail) {
                return clubMembership;
            }
        }
        return null;
    }

    setName(name: string): void {
        //
        if (name.length < this.MINIMUM_NAME_LENGTH) {
            throw new Error('\n> Name should be longer than '+ this.MINIMUM_NAME_LENGTH);
        }
        this.name = name;
    }

    setIntro(intro:string): void {
        //
        if (intro.length < this.MINIMUM_INTRO_LENGTH) {
            throw new Error('\n> Intro should be longer than '+ this.MINIMUM_INTRO_LENGTH);
        }
        this.intro = intro;
    }
}

export default TravelClub;