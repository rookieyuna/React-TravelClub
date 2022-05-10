import {IBoard} from "../../stores/BoardStore";
import TravelClub from "../../entity/club/TravelClub";
import SocialBoard from "../../entity/board/SocialBoard";

export interface IBoardProps {

    board?: IBoard;
    boards?: SocialBoard[];
    name?: string;
    clubId?:string;

    boardState?: boolean;
    alertText?: string;

    onSetBoardProps?(name: string, value:string): void;
    onSetBoardState?(mode: boolean): void;
    onAddBoard?(): void;
    onUpdateBoard?(): void;
    onSelectedBoard?(board: SocialBoard): void;
    onRemoveBoard?(board: SocialBoard): void;
    onFindClub?(clubId: string): TravelClub ;

    clubs?: Map<string, TravelClub>;
    clubList?: Map<string, TravelClub>;
}