import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { searchContact, searchContactDelete, getContact } from '../store/contactSlice';
import { showError } from '../store/errorSlice';

const initialFormValues = {
  search: '',
};

function SearchBox() {
  const dispatch = useDispatch();

  const handleSearch = (values) => {
    if (values.search.trim() === '') {
      dispatch(searchContactDelete());
      dispatch(getContact());
    } else {
      dispatch(searchContact(values.search));
    }
  };

  const handleChange = (e, setFieldValue) => {
    const searchValue = e.target.value;
    setFieldValue('search', searchValue);

    if (searchValue.trim() === '') {
      dispatch(searchContactDelete());
      dispatch(getContact());
    } else if (/[^a-zA-Z0-9 ]/g.test(searchValue)) {
      dispatch(showError());
    } else {
      dispatch(searchContact(searchValue));
    }
  };

  return (
    <Formik initialValues={initialFormValues} onSubmit={handleSearch}>
      {({ setFieldValue, values }) => (
        <Form className='my-5 pb-5'>
          <div className='input-group'>
            <Field
              type='text'
              className='form-control fs-4 px-4'
              placeholder='Search'
              name='search'
              value={values.search}
              onChange={(e) => handleChange(e, setFieldValue)}
            />
            {values.search.trim() ? (
              <span
                className='input-group-text'
                onClick={() => {
                  setFieldValue('search', '');
                  dispatch(searchContactDelete());
                  dispatch(getContact());
                }}
              >
                <i className='bi bi-x-square text-danger fs-4'></i>
              </span>
            ) : (
              <span
                className='input-group-text'
                onClick={() => {
                  dispatch(searchContactDelete());
                  dispatch(getContact());
                }}
              >
                <i className='bi bi-search fs-4 '></i>
              </span>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SearchBox;
