import DateUtil from "../../util/DateUtil";
import Entity from "../Entity";

class TravelClub implements Entity{

    private readonly MINIMUM_NAME_LENGTH: number = 3;
    private readonly MINIMUM_INTRO_LENGTH: number = 10;

    clubId: string = '';
    name: string = '';
    intro: string = '';
    foundationDate: string = '';

    constructor(name: string, intro:string) {

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


    setName(name: string): void {
        //
        if (name.length < this.MINIMUM_NAME_LENGTH) {
            alert('Club name should be longer than '+ this.MINIMUM_NAME_LENGTH);
            throw new Error('Name length problem');
        }
        this.name = name;
    }

    setIntro(intro:string): void {
        //
        if (intro.length < this.MINIMUM_INTRO_LENGTH) {
            alert('Club intro should be longer than '+ this.MINIMUM_INTRO_LENGTH);
            throw new Error('Intro length problem');
        }
        this.intro = intro;
    }
}

export default TravelClub;