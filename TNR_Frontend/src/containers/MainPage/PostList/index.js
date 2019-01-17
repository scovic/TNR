import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Post from "./Post";

import PostListStyle from "assets/styles/containers/FirstPage/postListStyle";

const mockData = [
  {
    id: 1,
    contentType: "text",
    title: "post 1",
    content: "This is some content, and so good so far,",
    upvotes: 132,
    comments: [],
    community: {
      id: 124,
      name: "someCommunity"
    },
    postedBy: {
      id: 12,
      username: "crazyHorSe"
    }
  },
  {
    id: 2,
    contentType: "text",
    title: "post 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur et odio tempor pulvinar. Vivamus lobortis lacinia dui sed facilisis.",
    upvotes: 1004,
    comments: [],
    community: {
      id: 53,
      name: "askLinux"
    },
    postedBy: {
      id: 12,
      username: "icantc#"
    }
  },
  {
    id: 3,
    contentType: "text",
    title: "post 3",
    content:
      " Vestibulum rhoncus augue a tortor accumsan finibus. Nullam elementum lectus vel arcu rutrum eleifend. Phasellus dictum sed risus sit amet luctus.",
    upvotes: 12,
    comments: [1, 2, 3],
    community: {
      id: 15,
      name: "something"
    },
    postedBy: {
      id: 9,
      username: "popstickle"
    }
  }
];

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.openPost = this.openPost.bind(this);
  }

  openPost(jsonObj) {
    this.props.openPost(jsonObj);
  }

  render() {
    const { classes, openPost } = this.props;
    return (
      <React.Fragment>
        {mockData.map(post => (
          <Post
            openPost={this.openPost}
            key={post.id}
            id={post.id}
            upvotes={post.upvotes}
            title={post.title}
            contentType={post.contentType}
            content={post.content}
            comments={post.comments}
            community={post.community}
            postedBy={post.postedBy}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default withStyles(PostListStyle)(PostList);
