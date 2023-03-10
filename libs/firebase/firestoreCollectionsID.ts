// This exits to globalize the collections and prevent typo under the string hood
const COMMUNITIES = 'communities'
const USERS = 'users'
const COMMUNITYSUBS = 'communitySubs'
const POSTS = 'posts'
const IMAGE = 'image'
const VOTEPOST = 'votePost'
const COMMENTS = 'comments'

const collections = {
  POSTS: {
    id: POSTS,
    storage: {
      image: {
        id: IMAGE
      }
    }
  },
  COMMUNITIES: {
    id: COMMUNITIES,
    storage: {
      image: {
        id: IMAGE
      }
    }
  },
  USERS: {
    id: USERS,
    COMMUNITYSUBS: {
      id: COMMUNITYSUBS
    },
    VOTEPOST: {
      id: VOTEPOST
    }
  },
  COMMENTS: {
    id: COMMENTS
  }
}

export default collections
