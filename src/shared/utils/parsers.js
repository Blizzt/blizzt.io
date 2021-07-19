export function normalizeState(data, typeId = 'id') {
  const items = {};
  data.forEach((d) => {
    items[d[typeId]] = d;
  });

  return items;
}

export function normalizeStateComposed(data, typeIds = ['id']) {
  const items = {};
  // eslint-disable-next-line array-callback-return
  data.map((d) => {
    const typeValues = [];
    typeIds.forEach((typeId) => d[typeId] && typeValues.push(d[typeId]));
    items[typeValues.join('-')] = d;
  });
  return items;
}

export const unNormalizeState = (data) =>
  Object.keys(data).map((id) => data[id]);
