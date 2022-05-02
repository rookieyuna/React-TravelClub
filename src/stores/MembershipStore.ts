import {observable, makeObservable, computed, toJS, action} from 'mobx';
import ClubMembership from "../entity/club/ClubMembership";
import RoleInClub from "../entity/club/RoleInClub";

class MembershipStore{

    //몹엑스6에서 필요한 부분(데코레이터 사용을 위해)
    constructor() {
        makeObservable(this);
    }

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
    _searchText = '';

    @observable //생성&수정 구분용 (true가 생성이고 기본값)
    _membershipState: boolean = true;


    get membership(){ //입력된 데이터 얻기
        return this._membership;
    }

    @computed
    get memberships(): ClubMembership[] { //멤버쉽 목록 get메서드
        return toJS(this._memberships);
    }

    get searchText(){
        return this._searchText;
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
    setSearchText(searchText: string){
        this._searchText = searchText;
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


    /************************************************
     *************************************************/


    //memberships 목록에 membership 데이터 ClubMembership 타입으로 저장
    @action
    addMembership(membership: any, paramId: string): void {

        const newMembership = new ClubMembership(paramId, membership.memberEmail);

        this._memberships.push(newMembership);
        console.log('새 멤버쉽 추가완료');

        this._membership = {
            clubId: '',
            memberEmail: '',
            role: '',
        }; //등록 완료후 데이터 비우기
    };


    //clubId로 ClubMembership 찾기 (멤버쉽 리스트 반환)
    retrieveByClubId = (clubId: string):ClubMembership[] | null => {
        let foundMembership = this._memberships.filter((membership)=> membership.clubId === clubId);
        return foundMembership || null;
    };
    //memberEmail 로 ClubMembership 찾기 (멤버쉽 리스트 반환)
    retrieveByEmail = (memberEmail: string):ClubMembership[] | null => {
        let foundMembership= this._memberships.filter((membership)=> membership.memberEmail === memberEmail);
        return foundMembership || null;
    };

    // clubId와 memberEmail로 특정 membership 찾기
    getMembership = (clubId: string, memberEmail: string): ClubMembership | null => {
        let foundMembership = this._memberships.filter((membership)=> membership.clubId === clubId)
                .find((membership)=> membership.memberEmail === memberEmail)

        return foundMembership || null;
    }


    //선택한 ClubMembership 데이터로 현재 membership 데이터가 변경되는 메서드 (업데이트 버튼 클릭 시)
    @action
    selectedMembership(membership: ClubMembership){
        this._membership.clubId = membership.clubId;
        this._membership.memberEmail = membership.memberEmail;
        this._membership.role = membership.role;
        this.setMembershipStateToUpdate()
    }

    //선택된 ClubMembership 데이터 변경 메서드
    @action
    updateMembership(): void{
        let foundMembership = this.getMembership(this._membership.clubId, this._membership.memberEmail);

        if(foundMembership){ //일치하는 클럽 있을경우

            foundMembership.role = this._membership.role as RoleInClub; //선택된 club데이터를 현재 입력된 데이터로 변경

            this._membership = {
                clubId: '',
                memberEmail: '',
                role: '',
            }; //업데이트 완료후 데이터 비우기

            this.setMembershipStateToAdd(); //생성으로 입력창 상태값 변경

            //데이터가 업데이트되어도 List는 변경되는 데이터가 없어서 렌더링안됨(clubState 값을 보내서 해결)
        }
        else{
            alert('Sorry, Membership Update failed.');
        }
    }


    //선택된 ClubMembership 삭제하는 메서드
    @action
    removeMembership(membership: ClubMembership):void {

        let foundMembership = this.getMembership(membership.clubId, membership.memberEmail);
        if(foundMembership){
            const membershipIdx = this._memberships.indexOf(foundMembership);
            if(membershipIdx > -1) {
                this._memberships.splice(membershipIdx, 1);
            }
        }
    }
}

export default new MembershipStore();