/* eslint-disable react/no-unescaped-entities */
import style from '../App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { hideError } from '../store/errorSlice';
import { searchContactDelete } from '../store/contactSlice';

function ErrorModal() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error); // errorSlice'daki state'i dinliyoruz

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

  if (!error) return null;

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
