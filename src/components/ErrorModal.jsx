/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import style from "../App.module.css";

function ErrorModal({ onClose }) {
  const handleClose = (e) => {
    if (e.target.className.includes(style.modalBackdrop)) {
      onClose();
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
