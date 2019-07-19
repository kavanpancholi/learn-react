import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import FormControl from 'react-bootstrap/FormControl'
import { connect } from 'react-redux';
import {addTodoAction} from '../redux';
import uuid from 'uuid/v4';

const AddTodo = (props) => {
    const [status, setStatus] = useState(false);
    const [todo, setTodo] = useState('');

    const changeStatus = () => setStatus(true);
    const cancelTodo = () => setStatus(false);
    const handleChange = e => {
        setTodo(e.target.value);
    }
    const submitTodo = (event) => {
        event.preventDefault();
        props.addTodoAction({
            id: uuid(),
            name: todo,
            completed: false
        });
        setTodo('');
        cancelTodo();
    }
    let body = <Col sm={{ span: 6, offset: 3 }}>
        <Button variant="primary" className="w-100" onClick={() => changeStatus()}>Add Todo</Button>
    </Col>;
    if(status) {
        body = <Col>
            <form className="w-100" onSubmit={submitTodo}>
                <Row>
                    <Col md="6"><FormControl value={todo} onChange={handleChange}></FormControl></Col>
                    <Col md="auto"><Button variant="primary" type="submit">Submit</Button></Col>
                    <Col md="auto"><Button variant="danger" type="submit" onClick={() => cancelTodo()}>Cancel</Button></Col>
                </Row>
            </form>
        </Col>
    }

    return (
        <Container>
            <Row>
                <Col sm={{ span: 6, offset: 3 }}>
                    {body}
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    todos: state.todos
});

export default connect(
    mapStateToProps,
    { addTodoAction }
)(AddTodo);