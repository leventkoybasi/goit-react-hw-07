/* eslint-disable react-hooks/exhaustive-deps */
import Contact from './Contact';
import style from '../App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts, selectContactsStatus } from '../store/contactSlice.js';
import { deleteContact, getContact } from '../store/contactSlice.js';
import { useEffect } from 'react';
import Loading from './Loading.jsx';

function ContactList() {
  // const contacts = useSelector((state) => state.contact.data);
  const contacts = useSelector(selectContacts);
  const contactsStatus = useSelector(selectContactsStatus);
  console.log(contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContact());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className='mt-xl-3 mx-xl-3 px-xl-5 p-xs-3 m-xs-0'>
      <table className={`table table-hover text-white fs-xxl-3 fs-xl-6 ${style.transparentTable}`}>
        <thead>
          <tr className='align-middle'>
            <th scope='col'></th>
            <th scope='col'>Name</th>
            <th scope='col'>Phone Number</th>
            <th scope='col'>E-Mail</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {/* {contacts.map((item, index) => (
            <Contact
              key={item.id}
              item={item}
              index={index}
              onDelete={() => handleDelete(item.id)}
            />
          ))} */}

          {contacts.map((item, index) => (
            <Contact
              key={item.id}
              item={item}
              index={index}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </tbody>
      </table>
      {contactsStatus === 'loading' ? <Loading /> : null}
    </div>
  );
}

export default ContactList;
