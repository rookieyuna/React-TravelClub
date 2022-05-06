import React, { Component } from 'react';
import { TextField, InputAdornment  } from '@material-ui/core';
import  SearchIcon  from '@material-ui/icons/Search';
import {inject, observer} from "mobx-react";
import {IStoreProps} from "../stores/IStoreProps";


@inject('clubStore', 'memberStore', 'membershipStore', 'boardStore', 'postingStore')
@observer
class SearchbarContainer extends Component<IStoreProps> {

    clubProps = this.props.clubStore!;
    memberProps = this.props.memberStore!;
    membershipProps = this.props.membershipStore!;
    boardProps = this.props.boardStore!;
    postingProps = this.props.postingStore!;

    //검색어 입력시마다 searchText 업데이트 (게시판별 구분)
    onChangeSearchText(idx: string, searchText: string){
        console.log(idx);
        console.log('search: '+ searchText);

        switch (idx){
            case "club":
                this.clubProps.setSearchText(searchText);
                break;
            case "member":
                this.memberProps.setSearchText(searchText);
                break;
            case "membership":
                this.membershipProps.setSearchText(searchText);
                break;
            case "board":
                this.boardProps.setSearchText(searchText);
                break;
            case "posting":
                this.postingProps.setSearchText(searchText);
                break;
        }
    }

    render(){

        const idx = this.props.idx!;

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
        this.clubProps.setSearchText("");
        this.memberProps.setSearchText("");
        this.membershipProps.setSearchText("");
        this.boardProps.setSearchText("");
        this.postingProps.setSearchText("");
    }
}

export default SearchbarContainer;