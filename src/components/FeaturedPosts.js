import React from 'react'

const FeaturedPosts = ({
  posts = []
}) => {
  return (
    <ul>
      {
        posts.map((post, i) => {

          const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
          const postDate = new Date(post.pubDate)
          
          return (
          <li key={ i }>
            <h4><a href={ post.url }>{ post.title }</a></h4>
            <div className="blog-subtitle"><a href={ post.url }>{ post.subtitle }</a></div>
            <div className="blog-date">{ postDate.toLocaleDateString("en-US", dateOptions) }</div>
            <a href='https://will-carter.medium.com/community-mojo-b989517e3c7e'><img src={post.imgUrl} alt={post.title} /></a>
          </li>
          )
        })
      }
    </ul>
  )
}

export default FeaturedPosts
