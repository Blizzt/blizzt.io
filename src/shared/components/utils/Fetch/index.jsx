// Dependencies
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '@api/apollo';

function Fetch({
  gql = null,
  variables = {},
  onRender = () => null,
  onLoading = () => null
}) {
  const {
    data: { ...data },
    error,
    loading
  } = useQuery(gql, {
    variables
  });

  if (loading) {
    return onLoading();
  }

  const withError = !(error === undefined);

  return onRender(withError ? null : data, withError);
}

export default withApollo({ ssr: true })(Fetch);
