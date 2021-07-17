// Dependencies
import * as Yup from 'yup';
import { imageFormatSupported } from '@types/images';

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
      value => value && value.size <= 5000000 // 5MB
    )
    .test(
      'fileFormat',
      'The format is not supported',
      value => value && imageFormatSupported.includes(value.type)
    )
});

export default validationSchema;
