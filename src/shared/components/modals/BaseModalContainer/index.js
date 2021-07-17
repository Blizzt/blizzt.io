// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Styled Components
import {
  Layout,
  Header,
  Body,
  Title,
  Button
} from './styles';
import { CloseOutline } from 'react-ionicons';

// Assets

function BaseModalContainer({
  width,
  title = null,
  children,
  onClickClose = null
}) {
  return (
		<Layout width={width}>
			{(title || onClickClose) && (
				<Header>
					{title && (
						<Title>{title}</Title>
					)}
					{onClickClose && (
						<Button
							onClick={onClickClose}
						>
							<CloseOutline
								width={'24px'}
								height={'24px'}
							/>
						</Button>
					)}
				</Header>
			)}
			<Body>
				{children}
			</Body>
		</Layout>
  );
}

BaseModalContainer.propTypes = {
  width: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  onClickClose: PropTypes.func
};

export default BaseModalContainer;
