import React, { useEffect } from 'react';

const Alert = ({ list, removeAlert, message, type }) => {
  useEffect(() => {
    let timer = setTimeout(() => {
      removeAlert();
    }, 1000);
    return () => clearTimeout(timer);
  }, [list]);
  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
