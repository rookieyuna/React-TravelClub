import React, { Component } from 'react';
import { TextField, InputAdornment  } from '@material-ui/core';
import  SearchIcon  from '@material-ui/icons/Search';
import {inject, observer} from "mobx-react";


@inject('clubStore', 'memberStore', 'membershipStore', 'boardStore', 'postingStore')
@observer
class SearchbarContainer extends Component<any> {


    //검색어 입력시마다 searchText 업데이트 (게시판별 구분)
    onChangeSearchText(idx: string, searchText: string){
        console.log(idx);
        console.log('search: '+ searchText);

        switch (idx){
            case "club":
                this.props.clubStore.setSearchText(searchText);
                break;
            case "member":
                this.props.memberStore.setSearchText(searchText);
                break;
            case "membership":
                this.props.membershipStore.setSearchText(searchText);
                break;
            case "board":
                this.props.boardStore.setSearchText(searchText);
                break;
            case "posting":
                this.props.postingStore.setSearchText(searchText);
                break;
        }
    }

    render(){

        const {idx} = this.props;

        return (
            <TextField
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={(event)=> this.onChangeSearchText(idx, event.target.value)}
            />
        )
    }

    //컴포넌트 이동시 searchText가 남아있어 리스트 노출안되는 오류 => 컴포넌트 종료되면 searchText 초기화
    componentWillUnmount() {
        this.props.clubStore.setSearchText("");
        this.props.memberStore.setSearchText("");
        this.props.membershipStore.setSearchText("");
        this.props.boardStore.setSearchText("");
        this.props.postingStore.setSearchText("");
    }
}

export default SearchbarContainer;