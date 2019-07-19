import React, {useState} from 'react';
import { connect } from 'react-redux';
import {toggleTodoAction, deleteTodoAction} from '../redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ListTodo = (props) => {
    const { todos } = props;
    const toggleTodo = (todoId) => props.toggleTodoAction(todoId);
    const deleteTodo = (todoId) => {
        props.deleteTodoAction(todoId);
        setShow(false);
    }

    const [selectedTodo, setSelectedTodo] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (todo) => {
        setShow(true);
        setSelectedTodo(todo);
    }

    return (
        <div>
            {todos.length ?
                <ul className="list-group">
                    {
                        todos.map(todo => (
                            <li className="list-group-item" key={todo.id}>
                                <div className="todo-text" onClick={toggleTodo.bind(null,todo.id)}>
                                    {(todo.complete) ? '👍' : '👌'}&nbsp;
                                    <span className={todo.complete ? 'complete' : null}>{todo.name}</span>
                                </div>
                                <button type="button" onClick={handleShow.bind(null, todo)} className="btn btn-danger float-right">Delete</button>
                            </li>
                        ))
                    }
                </ul>
                : <div>Add new in this list!</div>
            }
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure, want to remove this item?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {selectedTodo && <Button variant="primary" onClick={deleteTodo.bind(null, selectedTodo.id)}>
                        Save Changes
                    </Button>}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    todos: state.todos
  });

export default connect(
    mapStateToProps,
    { toggleTodoAction, deleteTodoAction }
)(ListTodo);