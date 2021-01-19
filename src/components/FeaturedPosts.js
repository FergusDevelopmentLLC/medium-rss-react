import React from 'react'

const FeaturedPosts = ({
  posts = []
}) => {
  return (
    <ul>
      {posts.map((post, i) => {

        const postDate = new Date(post.pubDate)
        
        return (
          <li key={ i }>
            <h4><a href={ post.url }>{ post.title }</a></h4>
            <div className="blog-subtitle"><a href={ post.url }>{ post.subtitle }</a></div>
            <div className="blog-date">{ postDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) }</div>
            <a href={ post.url }><img src={ post.imgUrl } alt={ post.title } /></a>
          </li>
        )
      })}
    </ul>
  )
}

export default FeaturedPosts
