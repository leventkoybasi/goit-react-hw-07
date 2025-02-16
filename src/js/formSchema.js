import * as yup from "yup";
// YUP Form Validation
const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .length(10, "Phone number must be 10 digits"),
  email: yup.string().email("Invalid email address").required("Email is required"),
});

export default formSchema;
