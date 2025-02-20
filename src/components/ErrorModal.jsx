/* eslint-disable react/no-unescaped-entities */
import style from '../App.module.css';
import { useDispatch } from 'react-redux';
import { hideError } from '../store/errorSlice.js';
import { searchContactDelete } from '../store/contactSlice.js';
// import { searchContact } from '../store/contactSlice.js';

function ErrorModal() {
  // const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const handleClose = (e) => {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains(style.closeButton) ||
      e.target.classList.contains('bi-x-circle-fill')
    ) {
      dispatch(hideError());
      dispatch(searchContactDelete());
    }
  };

  return (
    <>
      <div className={`${style.modalBackdrop} `}>
        <div className={`${style.modal} `}>
          <div className={`${style.closeButton} `} onClick={handleClose}>
            <i className='bi bi-x-circle-fill text-primary fs-5'></i>
          </div>
          <p className=''>We couldn't find anything matching your search. </p>
        </div>
      </div>
    </>
  );
}

export default ErrorModal;
