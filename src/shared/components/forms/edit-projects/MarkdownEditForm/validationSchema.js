// Dependencies
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  document: Yup.string()
    .required('The history of your project must be included as a must.')

});

export default validationSchema;
