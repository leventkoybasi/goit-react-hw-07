import { Formik, Form, Field, ErrorMessage } from 'formik';
import formSchema from '../js/formSchema';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContact } from '../store/contactSlice.js';

const initialFormValues = {
  name: '',
  phone: '',
  email: '',
};

function ContactForm() {
  const dispatch = useDispatch();
  // const contacts = useSelector((state) => state.contact);

  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      ...values,
    };
    dispatch(addContact(newContact)); // Yeni kişiyi ekliyoruz
    actions.resetForm();
  };

  return (
    <div className=''>
      <h2 className='text-white mt-5 mb-4 fs-4'>
        <i className='bi bi-pencil-fill me-4'></i>Add New Contact
      </h2>
      <Formik
        initialValues={initialFormValues} // Form başlangıç değerleri
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        <Form className='d-flex flex-column gap-3'>
          <div className='form-group position-relative'>
            <i className='bi bi-pencil position-absolute' style={{ top: '15px', left: '10px' }}></i>
            <Field
              type='text'
              name='name'
              className='form-control fs-4 ps-5'
              placeholder='Add Name'
            />
            <ErrorMessage name='name' component='div' className='text-danger' />
          </div>
          <div className='form-group position-relative'>
            <i
              className='bi bi-telephone position-absolute'
              style={{ top: '15px', left: '10px' }}
            ></i>
            <Field
              type='number'
              name='phone'
              className='form-control fs-4 ps-5'
              placeholder='Add Phone'
            />
            <ErrorMessage name='phone' component='div' className='text-danger' />
          </div>
          <div className='form-group position-relative'>
            <i
              className='bi bi-envelope position-absolute'
              style={{ top: '15px', left: '10px' }}
            ></i>
            <Field
              type='email'
              name='email'
              className='form-control fs-4 ps-5'
              placeholder='Add Email'
            />
            <ErrorMessage name='email' component='div' className='text-danger' />
          </div>

          <button type='submit' className='btn btn-primary fs-4 px-4 mt-4'>
            Add <i className='bi bi-pencil-square ms-2' />
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default ContactForm;
