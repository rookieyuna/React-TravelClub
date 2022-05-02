/*
import { todo } from './stores/todo';

const useStore = () => ({ todo });

export default useStore;

*/


import { useContext } from "react";
import { createContext } from "react";
import { TodoStore } from "./TodoStore";

const rootStoreContext = createContext({
    todoStore: new TodoStore()
});


export const useStores = () => useContext(rootStoreContext);
