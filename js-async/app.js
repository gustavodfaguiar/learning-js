let page = 1

const getPosts = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
  return await response.json()
}

getPosts()

