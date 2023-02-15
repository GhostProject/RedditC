// This exits to globalize the collections and prevent typo under the string hood
const COMMUNITIES = 'communities'
const USERS = 'users'
const COMMUNITYSUBS = 'communitySubs'
const POSTS = 'posts'
const IMAGE = 'image'

const collections = {
  POSTS: {
    id: POSTS,
    xPost: {
      image: {
        id: IMAGE
      }
    }
  },
  COMMUNITIES: {
    id: COMMUNITIES
  },
  USERS: {
    id: USERS,
    COMMUNITYSUBS: {
      id: COMMUNITYSUBS
    }
  }
}

export default collections
