import React, { useState, useEffect, useRef } from 'react';
import Alert from './Alert';
import List from './List';
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};
const App = () => {
  const inputRef = useRef();
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  });
  useEffect(() => {
    inputRef.current.focus();
  }, [editID]);
  const handleSubmit = e => {
    e.preventDefault();
    if (!name) {
      setAlert({
        show: true,
        message: 'Name is required',
        type: 'danger',
      });
      return;
    }
    if (list.length === 0) {
      setName('');
    }
    if (name && isEditing) {
      setList(
        list.map(item => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setIsEditing(false);
      setEditID(null);
      setName('');
    } else {
      const newItem = {
        id: Date.now(),
        title: name,
      };
      setList([...list, newItem]);
      setName('');
      showAlert(true, 'Item added', 'success');
    }
  };
  const showAlert = (show, message, type) => {
    setAlert({
      show,
      message,
      type,
    });
  };
  const removeItem = id => {
    showAlert(true, 'Item removed', 'danger');
    setList(prev => prev.filter(item => item.id !== id));
  };
  const clearList = () => {
    showAlert(true, 'List cleared', 'success');
    setList([]);
  };
  const editItem = id => {
    showAlert(true, 'Item edited', 'success');
    setIsEditing(true);
    setEditID(id);
    setName(list.find(item => item.id === id).title);
  };
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert removeAlert={showAlert} {...alert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            ref={inputRef}
          />
          <button type="submit" className="submit-btn">
            {' '}
            {isEditing ? 'editing' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear All List
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
