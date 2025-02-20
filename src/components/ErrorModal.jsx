/* eslint-disable react/no-unescaped-entities */
import style from '../App.module.css';
import { useDispatch } from 'react-redux';
import { hideError } from '../store/errorSlice.js';

function ErrorModal() {
  // const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const handleClose = (e) => {
    if (e.target.className.includes(style.modalBackdrop)) {
      dispatch(hideError());
    }
  };

  return (
    <>
      <div className={`${style.modalBackdrop} `} onClick={handleClose}>
        <div className={`${style.modal} `}>
          <div className={`${style.closeButton} `}>
            <i className='bi bi-x-circle-fill text-primary fs-6'></i>
          </div>
          <p className=''>We couldn't find anything matching your search. </p>
        </div>
      </div>
    </>
  );
}

export default ErrorModal;
