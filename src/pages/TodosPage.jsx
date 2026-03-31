import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TodoCard from '../components/cards/TodoCard.jsx'

export default function TodosPage() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((r) => r.json())
      .then((data) => setTodos(data))
      .catch((e) => setError(e?.message || 'Ошибка'))
      .finally(() => setLoading(false))
  }, [])

  const doneCount = todos.filter((t) => t.completed).length

  return (
    <>
      <section className="page">
        <header className="pageHeader">
          <h1 className="pageTitle">Todos</h1>
          <p className="pageSubtitle">
            {loading
              ? 'Загрузка...'
              : error
                ? 'Ошибка загрузки'
                : `Всего: ${todos.length} · Выполнено: ${doneCount}`}
          </p>
        </header>

        {error ? <div className="alert">{error}</div> : null}

        <div className="grid gridWide">
          {todos.map((t) => (
            <Link key={t.id} to={`/todos/${t.id}`} className="cardLink">
              <TodoCard todo={t} />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

