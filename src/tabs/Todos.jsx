import { useEffect, useState } from 'react';
import Form from '../components/Form/Form';
import Text from '../components/Text/Text';
import { nanoid } from 'nanoid';
import EditForm from '../components/EditForm/EditForm';
import Grid from '../components/Grid/Grid';
import TodoListItem from '../components/TodoListItem/TodoListItem';

const Todos = () => {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = value => {
    if (todos.some(todo => todo.text === value)) {
      alert('Todo with this text already exists!');
      return;
    }
    const newTodo = {
      id: nanoid(),
      text: value,
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onEditButtonClick = item => {
    setIsEditing(true);
    setCurrentTodo(item);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setCurrentTodo({});
  };

  const editTodo = updatedText => {
    if (todos.some(todo => todo.text === updatedText)) {
      alert('Todo with this text already exists!');
      return;
    }
    const updatedTodo = {
      id: currentTodo.id,
      text: updatedText,
    };
    const index = todos.findIndex(item => item.id === updatedTodo.id);
    setTodos(todos.toSpliced(index, 1, updatedTodo));
    setIsEditing(false);
    setCurrentTodo({});
  };

  return (
    <>
      {!isEditing ? (
        <Form onSubmit={addNewTodo} />
      ) : (
        <EditForm
          currentTodo={currentTodo}
          onCancel={onCancelEdit}
          onSubmit={editTodo}
        />
      )}

      {todos.length > 0 ? (
        <Grid>
          {todos.map(item => (
            <TodoListItem
              key={item.id}
              todo={item}
              onDelete={() => deleteTodo(item.id)}
              onEdit={() => onEditButtonClick(item)}
              isEditing={isEditing}
            />
          ))}
        </Grid>
      ) : (
        <Text textAlign="center">There are no any todos ...</Text>
      )}
    </>
  );
};

export default Todos;
