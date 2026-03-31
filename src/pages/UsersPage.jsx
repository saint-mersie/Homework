import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserCard from '../components/cards/UserCard.jsx'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((r) => r.json())
      .then((data) => setUsers(data))
      .catch((e) => setError(e?.message || 'Ошибка'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <section className="page">
        <header className="pageHeader">
          <h1 className="pageTitle">Users</h1>
          <p className="pageSubtitle">
            {loading
              ? 'Загрузка...'
              : error
                ? 'Ошибка загрузки'
                : `Найдено пользователей: ${users.length}`}
          </p>
        </header>

        {error ? <div className="alert">{error}</div> : null}

        <div className="grid">
          {users.map((u) => (
            <Link key={u.id} to={`/users/${u.id}`} className="cardLink">
              <UserCard user={u} />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

