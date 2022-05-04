import {Component} from "react";
import {inject, observer} from "mobx-react";
import ClubListView from "../views/clubviews/ClubListView";
import {Grid, Typography} from "@material-ui/core";
import ClubEditFormView from "../views/clubviews/ClubEditFormView";
import clubStore, {IClub} from "../stores/ClubStore";
import TravelClub from "../entity/club/TravelClub";
import SearchbarContainer from "./SearchbarContainer";


@inject('clubStore')
@observer
class ClubContainer extends Component<any> {

    //input에 입력되는값 실시간으로 club 데이터에 업데이트
    onSetClubProps(name: string,value: string){
        this.props.clubStore.setClubProps(name, value);
    }
    //리스트에서 선택한 값(TravelClub)으로 받아 현재 선택된 club으로 변경
    onSelectedClub(club: TravelClub){
        this.props.clubStore.selectedClub(club);
    }

    //업데이트 폼에서 등록버튼으로 돌아가기 위한 설정
    onSetClubState(mode:boolean){
        this.props.clubStore.setClubState(mode);
    }

    onAddClub(): void{
        let { clubStore } = this.props;
        //실시간저장 확인작업을 위한 console출력
        //console.log('Input name: '+ this.props.clubStore.club.name);
        //console.log('Input intro: '+ this.props.clubStore.club.intro);

        //클럽이름 입력여부 확인작업
        if(!clubStore.club.name || clubStore.club.name.length===0){
            alert('Please input club name!');
            return;
        }
        //클럽이름 중복을 방지하기 위한 확인작업
        if(clubStore.retrieveByName(clubStore.club.name)){
            alert('The club name is already exist!');
            return;
        }
        else{
            clubStore.addClub(clubStore.club);
        }
    }

    onUpdateClub(){
        let { clubStore } = this.props;
        //클럽이름 중복을 방지하기 위한 확인작업 (현재이름 그대로 유지할경우에도 가능하도록 Id확인)
        const overClub: TravelClub = clubStore.retrieveByName(clubStore.club.name);
        if(overClub && overClub.clubId!==clubStore.club.clubId){
            alert('The club name is already exist!');
            return;
        }
        else{
            clubStore.updateClub();
        }
    }

    onRemoveClub(club: TravelClub){

        //삭제 재확인을 위한 confirm 단계
        if(window.confirm('Are you sure to delete club?')===true){
            this.props.clubStore.removeClub(club);
        }
        else{
            alert('Delete cancelled');
        }
    }


    render() {

        let { club, clubs, clubState, searchText } = this.props.clubStore;

        clubs = clubs.filter((searchClub: TravelClub) => searchClub.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)

        return (
        <>
            <h1>Club Menu</h1>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ClubEditFormView
                        club = {club}
                        clubState = {clubState} //입력폼 생성&수정 변경위한 값
                        onSetClubProps = {this.onSetClubProps.bind(this)}
                        onSetClubState = {this.onSetClubState.bind(this)}
                        onAddClub = {this.onAddClub.bind(this)}
                        onUpdateClub = {this.onUpdateClub.bind(this)}
                    />
                </Grid>
                <Grid item xs={9}>
                    <Typography display={"inline"}>Club Name: </Typography>&nbsp;<SearchbarContainer idx = {"club"}/>
                    <ClubListView
                        clubs = {clubs}
                        clubState = {clubState} //입력폼 생성&수정 변경위한 값
                        onSelectedClub = {this.onSelectedClub.bind(this)} //인풋태그 업데이트용 프롭스로 전달
                        onRemoveClub = {this.onRemoveClub.bind(this)} //삭제함수를 프롭스로 전달
                    />
                </Grid>
            </Grid>
        </>
        )
    }
}

export default ClubContainer;