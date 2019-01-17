import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Post from "./Post";

import PostListStyle from "assets/styles/containers/FirstPage/postListStyle";

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.openPost = this.openPost.bind(this);
  }

  openPost(jsonObj) {
    this.props.openPost(jsonObj);
  }

  render() {
    const { postArray } = this.props;
    return (
      <React.Fragment>
        {postArray.map(post => (
          <Post
            openPost={this.openPost}
            key={post.post.id}
            id={post.post.id}
            upvotes={post.post.upvotes}
            title={post.post.title}
            contentType={"text"}
            content={post.post.content}
            comments={[]}
            community={post.community}
            postedBy={post.postedBy}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default withStyles(PostListStyle)(PostList);
