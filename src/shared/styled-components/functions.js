/**
 * Makes a conditional render of styles, this function is implemented to prevent renderings "undefined" within the CSS and to make the reading more comfortable.
 * @param cond Operation or conditional.
 * @param primaryQuery code to render within the operation logic. It acts as the first value when a elseif is detected.
 * @param secondaryQuery secondary code, optional and applicable as a else-if. Render CSS.
 * @returns {string} One or the other query depending on the conditional we assign.
 */
import { common } from '@styled-components/common';

export const isConditional = (cond, primaryQuery, secondaryQuery = null) => {
  return !secondaryQuery ? cond ? primaryQuery : '' : cond ? primaryQuery : secondaryQuery;
};

/**
 * Standardizes the layout by minimizing the writer of a media-query for reproduction of content on phones.
 * @param query style applied to mobile mode.
 * @returns {string} query with media-query in CSS.
 */
// Mobile
export const isMobile = query => {
  return `@media screen and (min-width: 0px) and (max-width: ${common.sizing.MAX_MOBILE_WIDTH}px) { ${query} }`;
};
