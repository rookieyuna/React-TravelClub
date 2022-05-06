import {observable, makeObservable, computed, toJS, action} from 'mobx';
import TravelClub from "../entity/club/TravelClub"

class ClubStore{

    //몹엑스6에서 필요한 부분(데코레이터 사용을 위해)
    constructor() {
        makeObservable(this);
    }

    @observable
    _club = {
        clubId: '',
        name: '',
        intro: ''
        //foundationDate
    }; //clubId, name, intro

    @observable
     _clubs: TravelClub[] = [];

    @observable
    _searchText = '';

    @observable //생성&수정 구분용 (true가 생성이고 기본값)
    _clubState: boolean = true;

    get club(){ //입력된 데이터 얻기
        return this._club;
    }

    @computed
    get clubs(): TravelClub[] { //클럽목록 get메서드
        return toJS(this._clubs);
    }

    get searchText(){
        return this._searchText;
    }

    get clubState(){ //입력폼 생성/수정 상태값 얻기
        return this._clubState;
    }

    /**********************************************/

    //club 값 설정해주는 메서드
    @action
    setClubProps(name: string, value: string){
        this._club = {
            ...this._club, //전개연산자 : name 바뀔때 intro가 바뀌면 안되므로 기존데이터 유지
            [name] : value
        }
    }

    @action
    setSearchText(searchText: string){
        this._searchText = searchText;
    }


    //입력폼 생성/수정 상태값 변경
    @action
    setClubState(mode: boolean): void{
        this._clubState = mode;

        if(mode===true){
            this._club = {
                clubId: '',
                name: '',
                intro: ''
            }; //업데이트 하려고했던 데이터 비우기
        }
    }

    /************************************************/

    //clubs 목록에 club 데이터 TravelClub 타입으로 저장
    currentId: number = 1; //clubId 시퀀스
    @action
    addClub(): void {
        const newClub = new TravelClub(this._club.name, this._club.intro);

        newClub.clubId = this.currentId.toString(); //clubId 시퀀스 부여
        this._clubs.push(newClub);
        this.currentId++; //시퀀스 증가

        this._club = {
            clubId: '', name: '', intro: ''
        }; //등록 완료후 input 데이터 비우기
    };


    //clubId로 TravelClub 찾기
    @action
     retrieve = (clubId: string):TravelClub | null => {
        let foundClub = this._clubs.find((club)=> club.clubId === clubId);
        return foundClub || null;
    };

    //clubName 으로 TravelClub 찾기
    @action
    retrieveByName = (clubName: string):TravelClub | null => {
        let foundClub = this._clubs.find((club)=> club.name === clubName);
        return foundClub || null;
    }


    //선택한 TravelClub 데이터로 현재 club 데이터가 변경되는 메서드 (업데이트 기능 수행용)
    @action
    selectedClub(club: TravelClub){
        this._club.clubId = club.clubId;
        this._club.name = club.name;
        this._club.intro = club.intro;

        this.setClubState(false);
    }

    //선택된 TravelClub 데이터 값을 입력된 값으로 업데이트 하기
    @action
    updateClub(): void{
        let foundClub = this.retrieve(this._club.clubId);

        if(foundClub){ //일치하는 클럽 있을경우
            foundClub.name = this._club.name; //선택된 club데이터를 현재 입력된 데이터로 변경
            foundClub.intro = this._club.intro;

            this.setClubState(true); //생성으로 입력창 상태값 변경

            //데이터가 업데이트되어도 List는 변경되는 데이터가 없어서 렌더링안됨(clubState 값을 보내서 해결)
        }
        else{
            alert('Sorry, club Update failed.');
        }
    }

    //선택된 TravelClub 삭제하는 메서드
    @action
    removeClub(club: TravelClub):void {
        let foundClubIndex = this._clubs.findIndex((myClub)=> myClub.clubId === club.clubId); //findIndex로 인덱스까지 한번에 찾음
        if(foundClubIndex > -1) {
            this._clubs.splice(foundClubIndex, 1);
        }
        //데이터 비우기
        this._club = {
            clubId: '',
            name: '',
            intro: ''
        };
    }
}

export default new ClubStore();