import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function PostDetailsPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((r) =>
        r.json(),
      ),
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(
        (r) => r.json(),
      ),
    ])
      .then(([p, c]) => {
        setPost(p)
        setComments(c)
      })
      .catch((e) => setError(e?.message || 'Ошибка'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <>
      <section className="page">
        <header className="pageHeader pageHeaderRow">
          <div>
            <h1 className="pageTitle">{post?.title || `Post #${id}`}</h1>
          </div>
          <div className="actions">
            <Link to="/posts" className="btn">
              ← Назад к списку
            </Link>
          </div>
        </header>

        {error ? <div className="alert">{error}</div> : null}

        {loading ? (
          <div className="empty">Loading...</div>
        ) : post ? (
          <div className="details">
            <article className="card detailsCard detailsCardWide">
              <div className="pill">User #{post.userId}</div>
              <div className="postTitle postTitleBig">{post.title}</div>
              <div className="postBody postBodyBig">{post.body}</div>
            </article>

            <article className="card detailsCard">
              <div className="detailsTitle">Комментарии: {comments.length}</div>
              <div className="commentList">
                {comments.slice(0, 8).map((c) => (
                  <div key={c.id} className="comment">
                    <div className="commentHead">
                      <div className="commentName">{c.name}</div>
                      <div className="commentEmail">{c.email}</div>
                    </div>
                    <div className="commentBody">{c.body}</div>
                  </div>
                ))}
              </div>
              {comments.length > 8 ? (
                <div className="muted">Показаны первые 8 комментариев.</div>
              ) : null}
            </article>
          </div>
        ) : (
          <div className="empty">Пост не найден.</div>
        )}
      </section>
    </>
  )
}

