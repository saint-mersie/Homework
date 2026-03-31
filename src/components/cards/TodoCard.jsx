export default function TodoCard({ todo }) {
  const done = Boolean(todo?.completed)
  return (
    <>
      <article className="card todoCard">
        <div className="todoTop">
          <div className="pill">User #{todo?.userId}</div>
          <div className={done ? 'status statusDone' : 'status statusTodo'}>
            {done ? 'DONE' : 'TODO'}
          </div>
        </div>
        <div className="todoTitle">{todo?.title}</div>
        <div className="cardHint">Открыть todo →</div>
      </article>
    </>
  )
}

