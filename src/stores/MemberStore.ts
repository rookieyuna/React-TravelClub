import {observable, makeObservable, computed, toJS, action} from 'mobx';
import CommunityMember from "../entity/club/CommunityMember";


class MemberStore{

    //몹엑스6에서 필요한 부분(데코레이터 사용을 위해)
    constructor() {
        makeObservable(this);
    }

    @observable
    _member = {
        email: '',
        name: '',
        phoneNumber: '',
        nickName: '',
        birthDay: ''
    }; //email, name, phoneNumber

    @observable
    _members: CommunityMember[] = [];

    @observable
    _searchText = '';

    @observable //생성&수정 구분용 (true가 생성이고 기본값)
    _memberState: boolean = true;

    get member(){ //입력된 데이터 얻기
        return this._member;
    }

    @computed
    get members(): CommunityMember[] { //클럽목록 get메서드
        return toJS(this._members);
    }

    get searchText(){
        return this._searchText;
    }

    get memberState(){ //입력폼 생성/수정 상태값 얻기
        return this._memberState;
    }

    /**********************************************/

    //member 값 설정해주는 메서드
    @action
    setMemberProps(name: string, value: string){
        this._member = {
            ...this._member, //전개연산자 : name 바뀔때 intro가 바뀌면 안되므로 기존데이터 유지
            [name] : value
        }
    }

    @action
    setSearchText(searchText: string){
        this._searchText = searchText;
    }

    //입력폼 생성/수정 상태값 변경
    @action
    setMemberStateToAdd(): void{
        this._member = {
            email: '',
            name: '',
            phoneNumber: '',
            nickName: '',
            birthDay: ''
        }; //업데이트 하려했던 데이터 비우기
        this._memberState = true;
    }

    @action
    setMemberStateToUpdate(): void{
        this._memberState = false;
    }

    /************************************************/

    //members 목록에 member 데이터 CommunityMember 타입으로 저장
    @action
    addMember(member: any): void {

        //이메일 형식 확인작업
        if (!this.isValidEmailAddress(member.email)) {
            alert('Email format is incorrect')
            return;
        }

        const newMember = new CommunityMember(member.email, member.name, member.phoneNumber);
        this._members.push(newMember);
        console.log('새 멤버 추가완료');
    };

    isValidEmailAddress(email: string): boolean{

        const ePattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";

        return !!email.match(ePattern);
    }


    //선택한 CommunityMember 데이터로 현재 member 데이터가 변경되는 메서드
    @action
    selectedMember(member: CommunityMember){
        this._member.email = member.email;
        this._member.name = member.name;
        this._member.phoneNumber = member.phoneNumber;

        this.setMemberStateToUpdate()
    }

    //email로 CommunityMember 찾기
    @action
    retrieve = (email: string):CommunityMember | null => {
        let foundMember = this._members.find((member)=> member.email === email);
        return foundMember || null;
    };


    //선택된 CommunityMember 데이터 값 변경하기
    @action
    updateMember(): void{
        let foundMember = this.retrieve(this._member.email);

        if(foundMember){ //일치하는 클럽 있을경우
            foundMember.name = this._member.name; //선택된 member데이터를 현재 입력된 데이터로 변경
            foundMember.phoneNumber = this._member.phoneNumber;
            foundMember.nickName = this._member.nickName;
            foundMember.birthDay = this._member.birthDay;


            this._member = {
                email: '',
                name: '',
                phoneNumber: '',
                nickName: '',
                birthDay: ''
            }; //업데이트 완료후 데이터 비우기

            this.setMemberStateToAdd(); //생성으로 입력창 상태값 변경

            //데이터가 업데이트되어도 List는 변경되는 데이터가 없어서 렌더링안됨(MemberState 값을 보내서 해결)
        }
        else{
            alert('Sorry, member Update failed.');
        }
    }


    //선택된 CommunityMember 삭제하는 메서드
    @action
    removeMember(member: CommunityMember):void {
        let foundMemberIndex = this._members.findIndex((myMember)=> myMember.email === member.email); //findIndex로 인덱스까지 한번에 찾음
        if(foundMemberIndex > -1) {
            this._members.splice(foundMemberIndex, 1);
        }
    }
}

export default new MemberStore();