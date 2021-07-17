// Dependencies
import * as Yup from 'yup';

const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/webp'
];

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'The name is too short')
    .required('You must enter a name'),

  description: Yup.string()
    .min(10, 'The description is very short')
    .required('You must indicate a description for your project.'),

  categoryId: Yup.number()
    .required('You must indicate the category of your project'),

  photo: Yup.mixed()
    .required('It is mandatory to insert an image here')
    .test(
      'fileSize',
      'The file you have tried to upload is very heavy.',
      value => {
        if (typeof value === 'string') {
          return true;
        }
        return value && value.size <= 5000000;
      }
    )
    .test(
      'fileFormat',
      'The format is not supported',
      value => {
        if (typeof value === 'string') {
          return true;
        }
        return value && SUPPORTED_FORMATS.includes(value.type);
      }
    )
});

export default validationSchema;
