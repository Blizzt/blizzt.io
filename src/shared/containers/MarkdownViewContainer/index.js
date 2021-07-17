// Dependencies
import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

// Styled Components
import { MarkdownLayout } from '@styled-components/markdown';

function MarkdownViewContainer({ document = null }) {
  if (!document) {
    return null;
  }

  return (
  	<MarkdownLayout>
			<ReactMarkdown plugins={[gfm]}>
				{document}
			</ReactMarkdown>
		</MarkdownLayout>
  );
}

export default MarkdownViewContainer;
