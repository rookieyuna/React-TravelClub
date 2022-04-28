import React, { useState } from "react";
import { observer } from "mobx-react";
import TodoItem from "./TodoItem";
//import { StyledTodoList, StyledHeader, Container } from "./styles";
import { Button } from "@material-ui/core";
//import ModalNewTodo from "../ModalNewTodo";
import { useStores } from "../useStore";

const TodoList = observer(() => {
    const [modalNewTodoIsOpen, setModalNewTodo] = useState(false);
    const { todoStore } = useStores();

    return (
        <>
            <h2>mobx todo</h2>
            <Button
                color="primary"
                variant="contained"
                onClick={() => setModalNewTodo(true)}
            >
                Add new
            </Button>

            {todoStore.incompleteTodos.length === 0 && <p>Nothing to do!</p>}
            {todoStore.incompleteTodos.map(todo => {
                return <TodoItem key={todo.id} todo={todo} />;
            })}
        </>
    );
});

export default TodoList;
