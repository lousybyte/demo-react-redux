import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { loadTodos, removeTodoRequest, completeTodoRequest } from "./redux/thunks";
import { getCompleteTodos, getIncompleteTodos, getTodosLoading } from "./selectors";
import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = ({ completeTodos, incompleteTodos, isLoading, startLoadingTodos, onRemovePressed, onCompletePressed }) => {
  useEffect(() => {
    startLoadingTodos();
  }, [])

  const loadingMessage = <div>Loading todos...</div>;

  const content = (
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete</h3>
      {incompleteTodos.map(todo => <TodoListItem key={todo.id} todo={todo} onRemovePressed={onRemovePressed} onCompletePressed={onCompletePressed} />)}
      <h3>Completed</h3>
      {completeTodos.map(todo => <TodoListItem key={todo.id} todo={todo} onRemovePressed={onRemovePressed} onCompletePressed={onCompletePressed} />)}
    </ListWrapper>
  );

  return isLoading ? loadingMessage : content;
}

const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  completeTodos: getCompleteTodos(state),
  incompleteTodos: getIncompleteTodos(state)
});

const mapDispatchToProps = (dispatch) => ({
  onRemovePressed: id => dispatch(removeTodoRequest(id)),
  onCompletePressed: id => dispatch(completeTodoRequest(id)),
  startLoadingTodos: () => dispatch(loadTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);