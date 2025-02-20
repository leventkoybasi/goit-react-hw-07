import { Formik, Form, Field } from 'formik';

const initialFormValues = {
  search: '',
};

function SearchBox() {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  return (
    <Formik initialValues={initialFormValues} onSubmit={() => console.log('OnSubmit Calisti...')}>
      <Form className='my-5 pb-5'>
        <div className='input-group'>
          <Field
            type='text'
            className='form-control fs-4 px-4'
            placeholder='Search'
            name='search'
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <span className='input-group-text'>
            <i className='bi bi-search fs-4'></i>
          </span>
        </div>
      </Form>
    </Formik>
  );
}

export default SearchBox;
