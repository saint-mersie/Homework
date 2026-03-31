import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function UserDetailsPage() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((r) => r.json())
      .then((data) => setUser(data))
      .catch((e) => setError(e?.message || 'Ошибка'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <>
      <section className="page">
        <header className="pageHeader pageHeaderRow">
          <div>
            <h1 className="pageTitle">{user?.name || `User #${id}`}</h1>
          </div>
          <div className="actions">
            <Link to="/users" className="btn">
              ← Назад к списку
            </Link>
          </div>
        </header>

        {error ? <div className="alert">{error}</div> : null}

        {loading ? (
          <div className="empty">Loading...</div>
        ) : user ? (
          <div className="details">
            <article className="card detailsCard">
              <div className="detailsTitle">Контакты</div>
              <div className="kv">
                <div className="k">Username</div>
                <div className="v">@{user.username}</div>
              </div>
              <div className="kv">
                <div className="k">Email</div>
                <div className="v">{user.email}</div>
              </div>
              <div className="kv">
                <div className="k">Phone</div>
                <div className="v">{user.phone}</div>
              </div>
              <div className="kv">
                <div className="k">Website</div>
                <div className="v">{user.website}</div>
              </div>
            </article>

            <article className="card detailsCard">
              <div className="detailsTitle">Адрес / Компания</div>
              <div className="kv">
                <div className="k">City</div>
                <div className="v">{user.address?.city}</div>
              </div>
              <div className="kv">
                <div className="k">Street</div>
                <div className="v">
                  {user.address?.street} {user.address?.suite}
                </div>
              </div>
              <div className="kv">
                <div className="k">Zipcode</div>
                <div className="v">{user.address?.zipcode}</div>
              </div>
              <div className="kv">
                <div className="k">Company</div>
                <div className="v">{user.company?.name}</div>
              </div>
              <div className="kv">
                <div className="k">Catch phrase</div>
                <div className="v">{user.company?.catchPhrase}</div>
              </div>
            </article>
          </div>
        ) : (
          <div className="empty">Пользователь не найден.</div>
        )}
      </section>
    </>
  )
}

