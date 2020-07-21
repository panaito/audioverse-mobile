// We are loading 50 audiobooks here since the audiobooks are cached and we want to have all of them locally
export default `query audiobooks($language: Language!, $afterCursor: String) {
  audiobooks(
    language: $language
    first: 50
    after: $afterCursor
    orderBy: [{ field: TITLE, direction: ASC }]
  ) {
    nodes {
      id
      title
      logoImage: logoImageWithFallback {
        url(size: 86)
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;