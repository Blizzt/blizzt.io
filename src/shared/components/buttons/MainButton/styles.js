// Dependencies
import styled from 'styled-components';
import { actionHandlers, buttonTypesId } from './index';
import { isConditional } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const Text = styled.div`
	font-size: 12px;
	font-family: "Inter SemiBold", sans-serif;
	text-transform: uppercase;
  transition: all 0.1s ease-in;
	white-space: nowrap;
`;

export const Icon = styled.img`
  width: 24px;
	height: 24px;
  ${props => props.left ? 'margin-right: 10px' : 'margin-left: 12px'};
`;

export const Element = styled.div`
	${props => props.left ? 'margin-right: 10px' : 'margin-left: 12px'};
`;

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const Layout = styled.button`
	display: flex;
	flex-direction: row;
	align-items: center;
  padding: 0 20px;
  border: none;
  border-radius: 4px;
  outline: none;
  user-select: none;
  transition: all 100ms ease-in;
	height: 44px;
  min-width: 136px;
	justify-content: center;
	overflow: hidden;

	@keyframes slideUp {
		0% {
			transform: translateY(50px);
		}
		100% {
			transform: translateY(0px);
		}
	}

	@keyframes slideUpDelay {
		0% {
			transform: translateY(50px);
		}
		10% {
			transform: translateY(0px);
		}
		90% {
			transform: translateY(0px);
		}
		100% {
			transform: translateY(0px);
		}
	}

	@keyframes slideDown {
		0% {
			transform: translateY(0px);
		}
		100% {
			transform: translateY(50px);
		}
	}
	
	:disabled {
		cursor: default !important;
	}

	${Element} {
		svg {
			transition: all 100ms ease-in;
		}
	}

	${props => `
			${isConditional(props.actionState === actionHandlers.ERROR, `
			background: ${common.colors.RED} !important;
			cursor: default;
			
			${Text} {
				color: ${common.colors.WHITE} !important;
			}
			
			${Container} {
				animation: slideUpDelay ease-in-out 2s;
			}
		`)}

		${isConditional(props.actionState === actionHandlers.COMPLETE, `
			background: ${common.colors.GREEN} !important;
			cursor: default;
			
			${Text} {
				color: ${common.colors.WHITE} !important;
			}
			
			${Container} {
				animation: slideUpDelay ease-in-out 2s;
			}
		`)}
	
		${isConditional(props.actionState === actionHandlers.LOADING, `
			background: ${common.colors.GRAY_SEMI_LIGHT} !important;
			cursor: default;
			
			${Text} {
				color: ${common.colors.GRAY_HARD} !important;
			}
			
			${Container} {
				animation: slideUp ease-in 150ms;
			}
		`)}
		
		${isConditional(props.classType === buttonTypesId.PRIMARY, `
			background: ${common.colors.PRIMARY};
			cursor: pointer;
			
			${Text} {
				color: ${common.colors.WHITE};
			}
			
			${Element} {
				svg {
					fill: ${common.colors.WHITE};
					color: ${common.colors.WHITE};
				}
			}			
		`)}
		
		${isConditional(props.classType === buttonTypesId.SECONDARY, `
			background: ${common.colors.PRIMARY_LIGHT};
			cursor: pointer;
			
			&:hover {
				background: ${common.colors.PRIMARY_LIGHT_HOVER};
			}
			
			${Text} {
				color: ${common.colors.BLACK};
			}
			
			${Element} {
				svg {
					fill: ${common.colors.BLACK};
					color: ${common.colors.BLACK};
				}
			}			
		`)}
		
		${isConditional(props.classType === buttonTypesId.DISABLED && props.actionState !== actionHandlers.COMPLETE, `
			background: ${common.colors.GRAY_LIGHT} !important;
			cursor: default;
			
			${Text} {
				color: ${common.colors.GRAY_MEDIUM} !important;
			}
			
			${Element} {
				svg {
					fill: ${common.colors.GRAY_MEDIUM};
					color: ${common.colors.GRAY_MEDIUM};
				}
			}	
		`)}
	`}
`;
