import {observable, makeObservable, computed, toJS, action} from 'mobx';
import ClubMembership from "../entity/club/ClubMembership";
import RoleInClub from "../entity/club/RoleInClub";
import memoryMap from "./io/MemoryMap";

interface IMembership {
    clubId : string,
    memberEmail : string,
    role: string
}

class MembershipStore{

    //몹엑스6에서 필요한 부분(데코레이터 사용을 위해)
    constructor() {
        makeObservable(this);
    }

    @observable
    _membership: IMembership = {
        clubId : '',
        memberEmail : '',
        role: '' // RoleInClub = RoleInClub.Member;
        //joinDate: string = '';
    }; //clubId, memberEmail

    @observable
    _memberships : Map<string, ClubMembership> = memoryMap.getInstance().membershipMap;

    @observable
    _searchText = '';

    @observable
    _alertText = '';

    @observable //생성&수정 구분용 (true가 생성이고 기본값)
    _membershipState: boolean = true;


    get membership(){ //입력된 데이터 얻기
        return this._membership;
    }

    @computed
    get memberships(): Map<string, ClubMembership> { //멤버쉽 목록 get메서드
        return toJS(this._memberships);
    }

    get searchText(){
        return this._searchText;
    }

    get alertText(){
        return this._alertText;
    }

    get membershipState(){ //입력폼 생성/수정 상태값 얻기
        return this._membershipState;
    }


    /**********************************************/


    @action
    setMembershipProps(name: string, value: string){
        this._membership = {
            ...this._membership, //전개연산자 : name 바뀔때 intro가 바뀌면 안되므로 기존데이터 유지
            [name] : value
        }
    }

    @action
    setSearchText(searchText: string){
        this._searchText = searchText;
    }
    @action
    setAlertText(alertText: string){
        this._alertText = alertText;
    }

    //입력폼 생성/수정 상태값 변경
    @action
    setMembershipState(mode:boolean): void{
        this._membershipState = mode;
        if(mode === true){
            this._membership = {
                clubId: '',
                memberEmail: '',
                role: ''
            }; //업데이트 하려고했던 데이터 비우기
        }
    }

    /************************************************
     *************************************************/

    //memberships 맵에 membership 데이터 ClubMembership 타입으로 저장
    sequence = 1;
    @action
    addMembership(paramId: string): void {
        const email = this._membership.memberEmail;
        const newMembership = new ClubMembership(paramId, email);

        this._memberships.set(paramId+':'+email, newMembership);
        console.log('새 멤버쉽 추가완료');
        this.sequence++;

        this._membership = {
            clubId: '',
            memberEmail: '',
            role: '',
        }; //등록 완료후 데이터 비우기
    };

    //memberEmail 로 ClubMembership 찾기 (멤버쉽 리스트 반환)
    retrieveByEmail = (memberEmail: string):ClubMembership[] | null => {

        let membershipList = Array.from(this._memberships.values());
        let foundMembership= membershipList.filter((membership)=> membership.memberEmail === memberEmail);

        return foundMembership || null;
    };

    // clubId와 memberEmail로 특정 membership 찾기
    getMembership = (clubId: string, memberEmail: string): ClubMembership | null => {

        let foundMembership = this._memberships.get(clubId+':'+memberEmail);
        /*
        //membership이 배열이었을 때 찾는 방법
        let foundMembership = this._memberships.filter((membership)=> membership.clubId === clubId)
                .find((membership)=> membership.memberEmail === memberEmail)*/

        return foundMembership || null;
    }


    //선택한 ClubMembership 데이터로 현재 membership 데이터가 변경되는 메서드 (업데이트 버튼 클릭 시)
    @action
    selectedMembership(membership: ClubMembership){
        this._membership.clubId = membership.clubId;
        this._membership.memberEmail = membership.memberEmail;
        this._membership.role = membership.role;

        this.setMembershipState(false);
    }

    //선택된 ClubMembership 데이터 변경 메서드
    @action
    updateMembership(): void{
        let foundMembership = this.getMembership(this._membership.clubId, this._membership.memberEmail);

        if(foundMembership){ //일치하는 클럽 있을경우
            foundMembership.role = this._membership.role as RoleInClub;
            this._memberships.set(this._membership.clubId+':'+this._membership.memberEmail, foundMembership);

            this.setMembershipState(true); //생성으로 입력창 상태값 변경
        }
        else{
            alert('Sorry, Membership Update failed.');
        }
    }


    //선택된 ClubMembership 삭제하는 메서드
    @action
    removeMembership(membership: ClubMembership):void {

        this._memberships.delete(membership.clubId+':'+membership.memberEmail);

    }
}

export default new MembershipStore();