/* eslint-disable react/prop-types */

function Contact({ item, index, onDelete }) {
  return (
    <tr key={item.id} className='align-middle'>
      <th scope='row'>{index + 1}</th>
      <td>{item.name}</td>
      <td>{item.phone}</td>
      <td className='text-wrap text-break fs-6'>
        <small>{item.email}</small>
      </td>
      <td>
        <button className='btn btn-primary btn-sm' onClick={() => onDelete(item.id)}>
          <span className='d-none d-md-inline'>Delete</span>
          <i className='bi bi-trash3 ms-md-2 fs-5'></i>
        </button>
      </td>
    </tr>
  );
}

export default Contact;
