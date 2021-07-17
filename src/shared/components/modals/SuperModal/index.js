// Dependencies
import React, { useCallback, useEffect } from 'react';

// Styled Components
import { BackDrop } from '@styled-components/modals';

// Utils
import { lockMainPageScrollY } from '@utils/ui';
import { getModalById } from './utils';

// Context
import { useTheme } from '@styled-components/index';

function SuperModal() {
  // Hooks
  const { modal: { id, data }, closeModal } = useTheme();

  useEffect(() => {
    if (id) {
      lockMainPageScrollY(true);
    } else {
      lockMainPageScrollY(false);
    }
    return () => {
      lockMainPageScrollY(false);
    };
  }, [id]);

  /**
	 * @function renderModalContent
	 * @description Memorized function that determines which modal to load.
	 */
  const renderModalContent = useCallback(() => {
    const propsToPass = {
      modalId: id,
      data,
      closeModal
    };

    const Component = getModalById(id);

    if (!Component || typeof Component !== 'function') {
      return null;
    }

    return (
      <Component {...propsToPass} />
    );
  }, [id, data]);

  return id ? (
			<BackDrop>
				{renderModalContent()}
			</BackDrop>
  ) : null;
}

export default SuperModal;
