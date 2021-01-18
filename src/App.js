import './App.css'
import React, { useEffect, useState } from "react"
import FeaturedPosts from './components/FeaturedPosts'
import Parser from 'rss-parser'

function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {

    const parser = new Parser()

    const filterNonPosts = (items, limit) => {

      let blogPosts = items.reduce((acc, item) => {
        
        let blogPost

        if(item["content:encoded"].indexOf("<figure>") > -1) {
          blogPost = {}
          blogPost.title = item["title"]
          blogPost.url = item["link"]
          blogPost.pubDate = item["pubDate"]

          const content = new DOMParser().parseFromString(item["content:encoded"], 'text/html')
          let subtitle = content.querySelector('p').textContent
          if(subtitle.length < 100) blogPost.subtitle = subtitle

          let image = content.querySelector('figure').querySelector('img')
          if(image) blogPost.imgUrl = image.src
        }

        if(blogPost) acc.push(blogPost)

        return acc
      }, [])

      if(blogPosts.length > 4) {
        return blogPosts.slice(0, limit)
      }
      else {
        return blogPosts
      }

    }

    const fetchPosts = async () => {
      const feed = await parser.parseURL('http://138.68.23.63:4050/medium')
      const blogPosts = filterNonPosts(feed.items, 5)
      setPosts(blogPosts)
    }

    fetchPosts()

  }, [])

  return (
    <div className="home">
      <main></main>
      <aside className="left">
      <FeaturedPosts posts={posts} />
      </aside>
    </div>
  )
}

export default App
