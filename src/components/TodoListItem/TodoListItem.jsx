import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import Text from '../Text/Text';
import style from './TodoListItem.module.css'; // обов'язково створити файл стилів

const TodoListItem = ({ todo, onDelete, onEdit, isEditing }) => {
  return (
    <div className={style.box}>
      <Text textAlign="center" marginBottom="20">
        TODO
      </Text>
      <Text>{todo.text}</Text>

      <button
        className={style.deleteButton}
        type="button"
        onClick={onDelete}
        disabled={isEditing}
        title="Delete"
      >
        <RiDeleteBinLine size={24} />
      </button>

      <button
        className={style.editButton}
        type="button"
        onClick={onEdit}
        disabled={isEditing}
        title="Edit"
      >
        <RiEdit2Line size={24} />
      </button>
    </div>
  );
};

export default TodoListItem;