'use client'
import { useState, useEffect } from 'react';
import { LuDelete } from 'react-icons/lu';

export default function AddTodo() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [todoDate, setTodoDate] = useState('today'); // Default to 'today'
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [showPopup, setShowPopUp] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (todoText.trim() !== '') {
      let date = new Date();
      if (todoDate === 'tomorrow') {
        date.setDate(date.getDate() + 1);
      } else if (todoDate === 'dayAfterTomorrow') {
        date.setDate(date.getDate() + 2);
      } else if (todoDate === 'overmorrow') {
        date.setDate(date.getDate() + 3);
      }
      setTodos([...todos, { text: todoText, date: date.toDateString() }]);
      setTodoText('');
    }
  };

  const updateTodo = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = { ...updatedTodos[index], text: newText };
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const deleteAll = () => {
    setShowPopUp(!showPopup);
  };

  const confirmDeleteAll = () => {
    setTodos([]);
    setShowPopUp(false);
  };

  return (
    <div className='flex flex-col items-center justify-center p-8 bg-white dark:bg-black dark:text-white'>
      <div className='flex flex-col items-center justify-center w-[400px]'>
        <div className='flex flex-col md:flex-row justify-between items-center space-x-2'>
          <input
            rows={1}
            cols={25}
            type='text'
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder='Enter Your Task'
            title='todo'
            className='py-3 px-8 rounded-xl text-[#6c6c6c] bg-[#dedede] dark:bg-[#202020] w-full focus:outline-none'
          />
          <select
            value={todoDate}
            onChange={(e) => setTodoDate(e.target.value)}
            className='py-3 px-8 rounded-xl text-[#6c6c6c] bg-[#dedede] dark:bg-[#202020] w-full focus:outline-none'
          >
            <option value='today'>Today</option>
            <option value='tomorrow'>Tomorrow</option>
            <option value='dayAfterTomorrow'>Day After Tomorrow</option>
            <option value='overmorrow'>Overmorrow</option>
          </select>
        </div>
        <button
          onClick={addTodo}
          variant='contained'
          className='add py-3 px-8 rounded-xl bg-black dark:bg-white dark:text-black text-white w-full mt-3'
        >
          Add It To The List
        </button>
      </div>
      <div className='flex justify-between items-center w-[400px] mt-10'>
        <p>Task List</p>
        <button onClick={deleteAll}>Clear All</button>
      </div>
      <div className='h-[1px] bg-[#dbdbdb] w-[400px] mt-2 mb-6'></div>
      <ul className='w-[400px]'>
        {todos.map((todo, index) => (
          <div
            key={index}
            className={`flex justify-between items-center my-3 w-full py-2 border border-[#dbdbdb] rounded-xl ${
              index === deletingIndex ? 'fade-out' : ''
            }`}
          >
            <input
              type='text'
              value={todo.text}
              className='py-2 pl-4 bg-transparent focus:outline-none text-xl text-wrap inline-block w-1/2'
              onChange={(e) => updateTodo(index, e.target.value)}
            />
            <h1>{todo.date}</h1>
            <div className='p-[9px] bg-[#ff3737] rounded-lg text-white mr-4'>
              <LuDelete
                onClick={() => {
                  setDeletingIndex(index); // Set the index of the item being deleted
                  setTimeout(() => {
                    deleteTodo(index); // Delete the item after the animation
                    setDeletingIndex(null); // Reset the deletingIndex state
                  }, 600); // Wait for the animation duration
                }}
                className='text-xl cursor-pointer'
              />
            </div>
          </div>
        ))}
        {showPopup && (
          <div className='flex items-center justify-between mt-12 z-10 bg-opacity-90'>
            <p>Do you want to clear all todos?</p>
            <div>
              <button
                onClick={confirmDeleteAll}
                className='bg-red-500 px-3 py-2 rounded-3xl text-white'
              >
                Yes
              </button>
              <button
                onClick={deleteAll}
                className='bg-[#dbdbdb] px-3 py-2 rounded-3xl ml-2'
              >
                No
              </button>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
}
