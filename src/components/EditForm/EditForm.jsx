 import { RiSaveLine } from 'react-icons/ri';
 import { MdOutlineCancel } from 'react-icons/md';
 import style from './EditForm.module.css';

const EditForm = ({ currentTodo, onCancel, onSubmit }) => {

  const handleSubmit = e => {
    e.preventDefault();

    const inputValue = e.target.text.
    value.trim();

    if (!inputValue) {
      alert('empty value');
      return;
    }

    onSubmit(inputValue);
    e.target.reset();
  };


  return (
    <form className={style.form} onSubmit={handleSubmit}>
  <button className={style.submitButton} type="submit">
    <RiSaveLine color="green" size="16px" />
  </button>

  <button className={style.editButton} type="button" onClick={onCancel}>
    <MdOutlineCancel color="red" size="16px" />
  </button>

  <input
    className={style.input}
    placeholder="What do you want to write?"
    name="text"
    required
    defaultValue={currentTodo.text}
    autoFocus
  />
</form>
  );
};
export default EditForm;
