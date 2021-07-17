import styled from 'styled-components';
import { common } from '@styled-components/common';

export const MarkdownLayout = styled.div`
	> * {
		font-family: "Inter Regular", sans-serif;
    word-break: break-word;
	}

  code {
    background: #eff5fb;
    display: block;
    padding: 16px;
    line-height: 24px;
    font-size: 14px;
    border-radius: 8px;
    font-family: 'Inter Regular', sans-serif;
    color: ${common.colors.PRIMARY};
  }

  table {
    border: 1px solid #fdc4de;
    border-radius: 4px;
  }

  th {
    padding: 12px;
    font-family: 'Inter SemiBold', sans-serif;
    line-height: 24px;
    font-size: 14px;
    color: ${common.colors.PRIMARY};
  }
	
	td {
		padding: 12px;
	}

  blockquote {
    margin: 0;
    border-left: 5px solid ${common.colors.GRAY_SEMI_LIGHT};;
    padding: 2px 22px;
  }

  h1 {
    font-size: 24px;
    font-family: 'Inter SemiBold', sans-serif;
    border-bottom: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
    padding: 10px 0;
	}
	
	h2 {
    font-size: 20px;
    font-family: 'Inter SemiBold',sans-serif;
    border-bottom: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
    padding: 10px 0;
	}
	
	h3 {
    font-size: 18px;
    font-family: 'Inter SemiBold',sans-serif;
    padding: 10px 0;
	}
	
	h4 {
    font-size: 16px;
    font-family: 'Inter SemiBold',sans-serif;
    padding: 10px 0;
	}
	
	h5 {
    font-size: 14px;
    font-family: 'Inter SemiBold',sans-serif;
    padding: 10px 0;
	}
	
	a {
		color: ${common.colors.PRIMARY};
		text-decoration: underline;
	}
	
	p {
    padding: 0;
    line-height: 24px;
    font-size: 14px;
	}

  hr {
    border: 2px solid ${common.colors.GRAY_SEMI_LIGHT};
    margin-block-start: 2em;
    margin-block-end: 2em;
  }
	
	ol li, ul li {
    padding: 6px 0;
		list-style: none;
    line-height: 24px;
    font-size: 14px;
	}
	
	ol {
		counter-reset: item;
	}
	
  ol li:before {
    content: counter(item) ". ";
    counter-increment: item;
    color: ${common.colors.PRIMARY};
    font-family: ${common.fonts.MEDIUM};
    font-size: 14px;
		margin-right: 4px;
  }

  ul li::before {
    content: "\\2022";
    color: ${common.colors.PRIMARY}; 
    font-weight: bold;
    display: inline-block; 
    width: 1em; 
    margin-left: -1em;
  }

  input[type=checkbox] {
    position: relative;
    cursor: pointer;
    margin-right: 12px;
    margin-top: 12px;
    margin-bottom: 6px;
  }

  input[type=checkbox]:before {
    content: "";
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0;
    left: 0;
    border: 2px solid ${common.colors.PRIMARY};
    border-radius: 2px;
    background-color: white;
  }

  input[type=checkbox]:checked:after {
    content: "";
    display: block;
    width: 5px;
    height: 10px;
    border: solid ${common.colors.PRIMARY};
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    top: 2px;
    left: 6px;
  }
`;
