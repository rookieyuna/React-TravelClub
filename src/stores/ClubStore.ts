import {observable, makeObservable, computed, toJS, action} from 'mobx';
import {autobind} from "core-decorators";
import TravelClub from "../entity/club/TravelClub"


export interface IClub {
    clubId: string;
    clubName: string;
    clubIntro: string;
}

@autobind
class ClubStore{

    //몹엑스6에서 필요한 부분(데코레이터 사용을 위해)
    constructor() {
        makeObservable(this);
    }

    currentId: number = 0; //clubId 시퀀스

    @observable
    public _clubs: IClub[] = [
        { clubId: '1', clubName: "USA club", clubIntro: 'club 1 intro' },
        { clubId: '2', clubName: "UK club", clubIntro: 'club 2 intro' },
        { clubId: '3', clubName: "JP club", clubIntro: 'club 3 intro' }
    ];

    get clubs(): IClub[] { //클럽목록 get메서드
        return this._clubs;
    }

    @action
    public addClub = (clubName:string, clubIntro:string) => {
        const club =  { clubId: this.currentId.toString(), clubName: clubName, clubIntro: clubIntro};
        this.clubs.push(club);
        console.log('새 클럽 추가완료');
        this.currentId++; //시퀀스 증가
    };

    @action
    public retrieve = (clubId: string):IClub | null => {
        let foundClub = this._clubs.find((club)=> club.clubId === clubId);
        return foundClub || null;
    };
}

export default ClubStore;