import gql from 'graphql-tag';

export const productRequestSummaryFragment = gql`
  fragment productRequestSummaryFields on ProductRequestSummaryType {
    id,
    generic,
    brand,
    requestPriorityId,
    requestPriority,
  }
`;