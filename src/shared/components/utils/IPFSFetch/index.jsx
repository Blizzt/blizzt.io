// Dependencies
import { useReducer } from 'react';
import { withApollo } from '@api/apollo';
import { useIsomorphicLayoutEffect } from 'react-use';
import { IPFS } from '@utils/web3';

const actions = {
  SET_LOADING: 'SET_LOADING',
  SET_DATA: 'SET_DATA',
  SET_ERROR: 'SET_ERROR'
};

const initialState = {
  data: {},
  isLoading: true,
  error: null
};

function IPFSReducer(state, { type, payload = {} }) {
  switch (type) {
    case actions.SET_ERROR:
      return {
        ...state,
        error: payload
      };

    case actions.SET_LOADING:
      return {
        ...state,
        isLoading: payload
      };

    case actions.SET_DATA:
      return {
        ...state,
        data: payload
      };

    default:
      return state;
  }
}

function IPFSFetch({
  metadata = {},
  endpoint = null,
  onRender = () => null,
  onLoading = () => null
}) {
  const [state, dispatch] = useReducer(IPFSReducer, initialState);

  useIsomorphicLayoutEffect(() => {
    if (endpoint) {
      try {
        // Set Loading to True
        dispatch({ type: actions.SET_LOADING, payload: true });

        async function fetch() {
          const metadata = await IPFS.get(endpoint);
          return metadata;
        }

        fetch().then((data) => {
          // Load Metadata or Data with IPFS
          const payload = (data && data.image) ? data : JSON.parse(metadata);

          // Set Data of Response
          dispatch({ type: actions.SET_DATA, payload });

          // Set Loading to false
          dispatch({ type: actions.SET_LOADING, payload: false });
        });
      } catch (e) {
        console.error(e);
        dispatch({ type: actions.SET_ERROR, payload: e });
        dispatch({ type: actions.SET_LOADING, payload: false });
      }
    }
  }, [endpoint]);

  if (state.isLoading) {
    return onLoading();
  }

  return onRender({ loading: state.isLoading, data: state.data });
}

export default withApollo()(IPFSFetch);
