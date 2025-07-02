import { useState } from 'react';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: '123' },
    { id: 1, content: '코딩 공부하기' },
    { id: 2, content: '잠 자기' },
  ]);

  return (
    <div className='container'>
      <h1>Todo List</h1>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className='input__container'>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        className='add__btn'
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue('');
        }}
      >
        추가하기
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className='todo__container'>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className='todo__list'>
      <div className='todo'>
        <input type='checkbox' id='checkbox' />
        <span>{todo.content}</span>
        {isEditing && (
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        )}
      </div>
      <div className='todo__bts'>
        <button
          className='isEditing__btn'
          onClick={() => {
            setTodoList((prev) =>
              prev.map((el) =>
                el.id === todo.id ? { ...el, content: inputValue } : el
              )
            );
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? '저장' : '수정'}
        </button>
        <button
          className='delete__btn'
          onClick={() => {
            setTodoList((prev) => {
              return prev.filter((el) => el.id !== todo.id);
            });
          }}
        >
          삭제
        </button>
      </div>
    </li>
  );
}

export default App;
