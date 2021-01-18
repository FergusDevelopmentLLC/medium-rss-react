import './App.css'
import React, { useEffect, useState } from "react"
import FeaturedPosts from './components/FeaturedPosts'
import Parser from 'rss-parser'

function App() {

  const parser = new Parser()
  const [posts, setPosts] = useState([])

  useEffect(() => {

    const fetchPosts = async () => {
      let feed = await parser.parseURL('http://138.68.23.63:4050/medium')
      
      let blogPosts = feed.items.reduce((acc, item) => {
        
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

      if(blogPosts.length > 4) setPosts(blogPosts.slice(0, 5))
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
