import React, { Component } from 'react';
import { TextField, InputAdornment  } from '@material-ui/core';
import  SearchIcon  from '@material-ui/icons/Search';
import {inject, observer} from "mobx-react";
import autobind from "autobind-decorator";


@inject('clubStore', 'memberStore')
@autobind
@observer
class SearchbarContainer extends Component<any> {

    onChangeSearchText(searchText: string){
        this.props.clubStore.setSearchText(searchText);
        //this.props.memberStore.setSearchText(searchText);
        //this.props.clubStore.setSearchTextMembership(searchText);
        console.log('search'+ searchText);
    }

    render(){

        return (
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={(event)=> this.onChangeSearchText(event.target.value)}
            />
        )}
}

export default SearchbarContainer;