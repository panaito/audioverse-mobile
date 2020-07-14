export default
`query blogPost($id: ID!) {
  blogPost(id: $id) {
    id
    title
    body
    image {
      url(size: 740)
    }
  }  
}
`
