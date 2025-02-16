/* eslint-disable react/prop-types */
import Contact from "./Contact";
import style from "../App.module.css";

function ContactList({ contact, setContact }) {
  const handleDelete = (id) => {
    const updatedContacts = contact.filter((item) => item.id !== id);
    setContact(updatedContacts);
    window.localStorage.setItem("Contacts", JSON.stringify(updatedContacts));
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
          {contact.map((item, index) => (
            <Contact key={item.id} item={item} index={index} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactList;
