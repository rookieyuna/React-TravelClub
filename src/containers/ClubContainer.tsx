import {Component} from "react";
import {inject, observer} from "mobx-react";
import ClubListView from "../views/ClubListView";
import {IClub} from "../stores/ClubStore";
import {Grid} from "@material-ui/core";
import ClubEditFormView from "../views/ClubEditFormView";


@inject('clubStore')
@observer
class ClubContainer extends Component<any, any>{

    onAddClub(clubName: string, clubIntro: string): void{
        this.props.clubStore.addClub(clubName, clubIntro);
    }

    render() {

        let { clubs } = this.props.clubStore;
        let clubList : IClub[] = clubs;

        console.log(clubList[0].clubId);

        return (
        <>
            <h2>Club List</h2>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <ClubEditFormView onAddClub = {this.onAddClub}/>
                </Grid>
                <Grid item xs={8}>
                    <ClubListView clubs = {clubList}/>
                </Grid>
            </Grid>
        </>
        )
    }
}

export default ClubContainer;