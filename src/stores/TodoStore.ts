import {observable, computed, action} from "mobx";

export interface ITodo {
    id: number;
    text: string;
    completed: boolean;
}

export class TodoStore {

    @observable
    public todos: ITodo[] = [
        { id: 1, text: "todo 1", completed: true },
        { id: 2, text: "todo 2", completed: false },
        { id: 3, text: "todo 3", completed: false }
    ];

    @action
    public addTodo = (todo: ITodo) => {
        this.todos.push(todo);
        console.log('추가완료');
    };


    public updateTodo = (updatedTodo: ITodo) => {
        const updatedTodos = this.todos.map(todo => {
            if (todo.id === updatedTodo.id) {
                return { ...updatedTodo };
            }
            return todo;
        });
        this.todos = updatedTodos;
    };

    public deleteTodo = (id: number) => {
        const updatedTodos = this.todos.filter(todo => todo.id !== id);
        this.todos = updatedTodos;
        console.log('삭제완료');
    };

    @computed
    get todoProgress() {
        const completedCount = this.todos.filter(t => t.completed).length;
        const totalCount = this.todos.length;
        return `${completedCount} / ${totalCount}`;
    }

    @computed
    get completedTodos() {
        return this.todos.filter(todo => todo.completed);
    }

    @computed
    get incompleteTodos() {
        return this.todos.filter(todo => !todo.completed);
    }
}
