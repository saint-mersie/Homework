import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../components/cards/PostCard.jsx'

export default function PostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((r) => r.json())
      .then((data) => setPosts(data))
      .catch((e) => setError(e?.message || 'Ошибка'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <section className="page">
        <header className="pageHeader">
          <h1 className="pageTitle">Posts</h1>
          <p className="pageSubtitle">
            {loading
              ? 'Загрузка...'
              : error
                ? 'Ошибка загрузки'
                : `Постов: ${posts.length}`}
          </p>
        </header>

        {error ? <div className="alert">{error}</div> : null}

        <div className="grid gridWide">
          {posts.map((p) => (
            <Link key={p.id} to={`/posts/${p.id}`} className="cardLink">
              <PostCard post={p} />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

