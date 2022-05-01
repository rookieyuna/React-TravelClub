import {observable, makeObservable, computed, toJS, action} from 'mobx';
import TravelClub from "../entity/club/TravelClub"
import ClubMembership from "../entity/club/ClubMembership";
import RoleInClub from "../entity/club/RoleInClub";
import CommunityMember from "../entity/club/CommunityMember";

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
    }; //id, name, intro

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
    setClubStateToAdd(): void{
        this._clubState = true;

        this._club = {
            clubId: '',
            name: '',
            intro: ''
        }; //업데이트 하려고했던 데이터 비우기
    }

    @action
    setClubStateToUpdate(): void{
        this._clubState = false;
    }

    /************************************************/

    //clubs 목록에 club 데이터 TravelClub 타입으로 저장
    currentId: number = 1; //clubId 시퀀스
    @action
    addClub(club: any): void {
        const newClub = new TravelClub(club.name, club.intro);
        newClub.clubId = this.currentId.toString(); //clubId 시퀀스 부여
        this._clubs.push(newClub);
        console.log('새 클럽 추가완료');
        this.currentId++; //시퀀스 증가
    };

    //선택한 TravelClub 데이터로 현재 club 데이터가 변경되는 메서드 (업데이트 기능 수행용)
    @action
    selectedClub(club: TravelClub){
        this._club.clubId = club.clubId;
        this._club.name = club.name;
        this._club.intro = club.intro;

        this.setClubStateToUpdate()
    }

    //clubId로 TravelClub 찾기
    @action
     retrieve = (clubId: string):TravelClub | null => {
        let foundClub = this._clubs.find((club)=> club.clubId === clubId);
        return foundClub || null;
    };

    @action
    retrieveByName = (clubName: string):TravelClub | null => {
        let foundClub = this._clubs.find((club)=> club.name === clubName);
        return foundClub || null;
    }

    //선택된 TravelClub 데이터 값 변경하기
    @action
    updateClub(): void{
        let foundClub = this.retrieve(this._club.clubId);

        if(foundClub){ //일치하는 클럽 있을경우
            foundClub.name = this._club.name; //선택된 club데이터를 현재 입력된 데이터로 변경
            foundClub.intro = this._club.intro;

            this._club = {
                clubId: '',
                name: '',
                intro: ''
            }; //업데이트 완료후 데이터 비우기

            this.setClubStateToAdd(); //생성으로 입력창 상태값 변경

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


    ///////////////////////////////////////////////////////////////////
    //////////////////////////[Memebership]////////////////////////////
    ///////////////////////////////////////////////////////////////////



    @observable
    _membership = {
        clubId : '',
        memberEmail : '',
        role: '' // RoleInClub = RoleInClub.Member;
        //joinDate: string = '';

    }; //clubId, memberEmail

    @observable
    _memberships : ClubMembership[] = [];

    @observable
    _searchTextMembership = '';

    @observable //생성&수정 구분용 (true가 생성이고 기본값)
    _membershipState: boolean = true;


    get membership(){ //입력된 데이터 얻기
        return this._membership;
    }

    @computed
    get memberships(): ClubMembership[] { //멤버쉽 목록 get메서드
        return toJS(this._memberships);
    }

    get searchTextMembership(){
        return this._searchTextMembership;
    }

    get membershipState(){ //입력폼 생성/수정 상태값 얻기
        return this._membershipState;
    }


    /**********************************************/

    //club 값 설정해주는 메서드
    @action
    setMembershipProps(name: string, value: string){
        this._membership = {
            ...this._membership, //전개연산자 : name 바뀔때 intro가 바뀌면 안되므로 기존데이터 유지
            [name] : value
        }
    }

    @action
    setSearchTextMembership(searchText: string){
        this._searchTextMembership = searchText;
    }

    //입력폼 생성/수정 상태값 변경
    @action
    setMembershipStateToAdd(): void{
        this._membershipState = true;

        this._membership = {
            clubId: '',
            memberEmail: '',
            role: ''
        }; //업데이트 하려고했던 데이터 비우기
    }

    @action
    setMembershipStateToUpdate(): void{
        this._membershipState = false;
    }


    /************************************************/


    //clubs 목록에 membership 데이터 ClubMembership 타입으로 저장
    @action
    addMembership(membership: any): void {

        //임시
        membership.clubId = '1';

        const newMembership = new ClubMembership(membership.clubId, membership.memberEmail);

        this._memberships.push(newMembership);
        console.log('새 멤버쉽 추가완료');
    };

    //선택한 TravelClub 데이터로 현재 club 데이터가 변경되는 메서드
    @action
    selectedMembership(membership: ClubMembership){
        this._membership.clubId = membership.clubId;
        this._membership.memberEmail = membership.memberEmail;
        this._membership.role = membership.role;
        this.setMembershipStateToUpdate()
    }

    //clubId로 TravelClub 찾기
    @action
    retrieveMembership = (clubId: string):ClubMembership | null => {
        let foundMembership = this._memberships.find((membership)=> membership.clubId === clubId);
        return foundMembership || null;
    };


    //선택된 ClubMembership 데이터 값 변경하기 (clubstore와 memberstore다변경해야함)
    @action
    updateMembership(): void{

    }


    //선택된 ClubMembership 삭제하는 메서드 (clubstore와 memberstore다변경해야함)
    @action
    removeMembership(membership: ClubMembership):void {

    }


}

export default new ClubStore();