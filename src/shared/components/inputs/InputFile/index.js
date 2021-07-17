// Dependencies
import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

// Styled Components
import {
  Layout,
  Circle,
  Label,
  Paragraph,
  Input,
  Absolute
} from './styles';

// Components
import Image from '@components/images/MainImage';

// Config
import { common } from '@styled-components/common';
// Assets
import {
  ImageOutline,
  AlertOutline
} from 'react-ionicons';

// Types
import { imageAspectRatio } from '@types/images';

function InputFile({
  value = null,
  aspectRatio = imageAspectRatio.SIXTEEN,
  error = null,
  onChange = () => {}
}) {
  // States
  const [pickedImageSource, setPickedImageSource] = useState(value);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 1) {
    	const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const base64 = reader.result;
        setPickedImageSource(base64);
        onChange({ file, base64 });
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const renderDropOverlay = useMemo(() => (
		<Absolute>
			<Circle>
				<ImageOutline
					color={common.colors.PRIMARY}
					height="22px"
					width="22px"
				/>
			</Circle>
			<Label>
				<Paragraph title={'true'}>Drop an image here, or select a file.</Paragraph>
				<Paragraph subtitle={'true'}>It must be a JPG, PNG, GIF, TIFF, or BMP, no larger than 200 MB.</Paragraph>
			</Label>
		</Absolute>
  ), []);

  const renderImagePreview = useMemo(() => (
  	<Absolute>
			<Image aspectRatio={aspectRatio} source={pickedImageSource} radius={8} />
		</Absolute>
  ), [pickedImageSource]);

  const renderErrorPreview = useMemo(() => (
  	<Absolute>
			<Circle>
				<AlertOutline
					color={common.colors.PRIMARY}
					height="22px"
					width="22px"
				/>
			</Circle>
			<Label>
				<Paragraph title={'true'}>{error}</Paragraph>
				<Paragraph subtitle={'true'}>It must be a JPG, PNG or WEBP, no larger than 5 MB.</Paragraph>
			</Label>
		</Absolute>
  ), [error]);

  return (
		<Layout aspectRatio={aspectRatio} isDragActive={isDragActive} {...getRootProps()}>
			<Input {...getInputProps()} />
			{error ? renderErrorPreview : !pickedImageSource ? renderDropOverlay : renderImagePreview}
		</Layout>
  );
}

export default InputFile;
