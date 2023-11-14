// Nomenclatura de variáveis

const listOfCategorys = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getDataFromGithub(req, res) {
  const githubUserName = String(req.query.username)

  if (!githubUserName) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const response = await fetch(`https://api.github.com/users/${githubUserName}`);

  if (response.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUserName}" not found`
    })
  }

  const data = await response.json()

  const orderedListOfCategory = listOfCategorys.sort((a, b) =>  b.followers - a.followers); 

  const category = orderedListOfCategory.find(i => data.followers > i.followers)

  const result = {
    githubUserName,
    category: category.title
  }

  return result
}

getDataFromGithub({ query: {
  username: 'josepholiveira'
}}, {})