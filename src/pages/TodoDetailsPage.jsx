import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function TodoDetailsPage() {
  const { id } = useParams()
  const [todo, setTodo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((r) => r.json())
      .then((data) => setTodo(data))
      .catch((e) => setError(e?.message || 'Ошибка'))
      .finally(() => setLoading(false))
  }, [id])

  const done = Boolean(todo?.completed)

  return (
    <>
      <section className="page">
        <header className="pageHeader pageHeaderRow">
          <div>
            <h1 className="pageTitle">{todo?.title || `Todo #${id}`}</h1>
          </div>
          <div className="actions">
            <Link to="/todos" className="btn">
              ← Назад к списку
            </Link>
          </div>
        </header>

        {error ? <div className="alert">{error}</div> : null}

        {loading ? (
          <div className="empty">Loading...</div>
        ) : todo ? (
          <div className="details">
            <article className="card detailsCard detailsCardWide">
              <div className="todoTop">
                <div className="pill">User #{todo.userId}</div>
                <div className={done ? 'status statusDone' : 'status statusTodo'}>
                  {done ? 'DONE' : 'TODO'}
                </div>
              </div>
              <div className="todoTitle todoTitleBig">{todo.title}</div>

              <div className="kv">
                <div className="k">ID</div>
                <div className="v">{todo.id}</div>
              </div>
              <div className="kv">
                <div className="k">Completed</div>
                <div className="v">{done ? 'true' : 'false'}</div>
              </div>
            </article>
          </div>
        ) : (
          <div className="empty">Todo не найден.</div>
        )}
      </section>
    </>
  )
}

