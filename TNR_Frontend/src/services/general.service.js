import config from "_config/config";

const token = localStorage.getItem("accToken");
console.log(token)

export function getAllCommunities() {
  return fetch(`${config.url}/communities`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function getUserCommunities() {
  return fetch(`${config.url}/user/communities`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function getCommunityPosts(communityTitle) {
  return fetch(`${config.url}/community/${communityTitle}`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function getHomePage() {
  return fetch(`${config.url}/home`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function getAllPage() {
  return fetch(`${config.url}/posts/all`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function getPopularPage() {
  return fetch(`${config.url}/posts/popular`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function addNewPost(postToAdd) {
  return fetch(`${config.url}/posts/add-new`, {
    method: "post",
    body: JSON.stringify(postToAdd), // pogledaj u postman kako izgleda objekat
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function upVotePost(post) {
  return fetch(`${config.url}/posts/upvote`, {
    method: "put",
    body: JSON.stringify(post), // pogledaj u postman kako izgleda objekat
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function downVotePost(post) {
  return fetch(`${config.url}/posts/downvote`, {
    method: "put",
    body: JSON.stringify(post), // pogledaj u postman kako izgleda objekat
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function getUserOverview() {
  return fetch(`${config.url}/user/overview`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function getSomeonesOverview(id) {
  return fetch(`${config.url}/user/overview`, {
    method: "post",
    body: JSON.stringify({ id: id }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function addNewComment(comment) {
  return fetch(`${config.url}/comments/add-new`, {
    method: "post",
    body: JSON.stringify(comment),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function addNewCommunity(community) {
  return fetch(`${config.url}/comments/add-new`, {
    method: "post",
    body: JSON.stringify(community), // POSTMAN
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

// const postId = req.body.postId
export function savePost(postId) {
  return fetch(`${config.url}/user/save-post`, {
    method: "post",
    body: JSON.stringify({ postId: postId }), // POSTMAN
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function subscribe(postId) {
  return fetch(`${config.url}/user/subscribe`, {
    method: "post",
    body: JSON.stringify({ id: postId }), // POSTMAN
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function getRecommended(object) {
  return fetch(`${config.url}/user/recommended`, {
    method: "post",
    body: JSON.stringify(object), // POSTMAN
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
}

export function getCommentsForPost(postId) {
  return fetch(`${config.url}/post/comments`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postId)
  })
    .then(resp => resp.json())
    .catch(err => console.error(err));
}

export function getUserPublishedPosts() {
  return fetch(`${config.url}/user/published`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => resp.json())
    .catch(err => console.error(err));
}

export function getUserUpvotedPosts() {
  return fetch(`${config.url}/user/upvoted`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => resp.json())
    .catch(err => console.error(err));
}

export function getUserDownvotedPosts() {
  return fetch(`${config.url}/user/downvoted`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => resp.json())
    .catch(err => console.error(err));
}

export function getUserSavedPosts() {
  return fetch(`${config.url}/user/saved`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => resp.json())
    .catch(err => console.error(err));
}

export function getUserCommentedPosts() {
  return fetch(`${config.url}/user/commented`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => resp.json())
    .catch(err => console.error(err));
}
