// Dependencies
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

function TimeRemaining({
  to = new Date(),
  children
}) {
  const remaining = formatDistanceToNow(new Date(to), { addSuffix: true });

  return children({ remaining });
}

export default TimeRemaining;
