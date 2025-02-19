import { useState } from 'react';
import style from './App.module.css';
import { contactData } from './data/contactData.js';

// Components
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBox from './components/SearchBox';
import ErrorModal from './components/ErrorModal.jsx';
// Variables
const savedContacts = window.localStorage.getItem('Contacts');

function App() {
  const getContact = () => {
    return savedContacts ? JSON.parse(savedContacts) : contactData;
  };
  //States
  const [contact, setContact] = useState(() => getContact());

  const [error, setError] = useState(false);

  //Submit Action
  const handleSubmit = (values, actions) => {
    setContact((prevContacts) => {
      const updatedContacts = [...prevContacts, values];
      window.localStorage.setItem('Contacts', JSON.stringify(updatedContacts));
      return updatedContacts;
    });
    actions.resetForm();
  };
  //onChange Action
  const onChange = (e) => {
    const searchValue = e.target.value;
    handleSearch(searchValue);
  };

  //Search Action
  const handleSearch = (searchValue) => {
    if (searchValue.trim() === '') {
      if (savedContacts) {
        setContact(JSON.parse(savedContacts));
      } else if (!savedContacts) {
        setContact(contactData);
        return;
      }
      return;
    }
    //Filter Action
    const filteredContacts = contact.filter(
      (item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.phone.toString().includes(searchValue) ||
        item.email.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filteredContacts.length === 0) {
      setError(true);
    } else {
      setError(false);
      setContact(filteredContacts);
      searchValue = '';
    }
  };
  return (
    <>
      <div className={`${style.shadowContainer}  w-md-100 m-md-auto`}>
        <div className='mx-xl-5 m-sm-0'>
          <div className='mb-4 border-bottom pb-4 fs-xxl-1 fs-lg-4'>
            <h1 className={`${style.mainTitle} text-white text-start mt-5`}>
              <i className='bi bi-telephone-fill me-4 '></i>
              Phonebook With Smart Sync (Redux)
            </h1>
          </div>
          <div className='row pt-5 '>
            <div className='col-12 col-xl-4 mb-4 px-lg-5 px-sm-2'>
              <SearchBox handleSearch={handleSearch} onChange={onChange} />
              <ContactForm handleSubmit={handleSubmit} />
            </div>
            <div className='col-12 col-xl-8 p-sm-0'>
              {!error ? (
                <ContactList contact={contact} setContact={setContact} />
              ) : (
                <ErrorModal
                  onClose={() => {
                    setError(false);
                    getContact();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='text-white text-center my-3' id='me'>
        <a href='https://github.com/leventkoybasi'>
          <p>
            leventkoybasi <i className='bi bi-github ms-2'></i>
          </p>
        </a>
      </div>
    </>
  );
}

export default App;
