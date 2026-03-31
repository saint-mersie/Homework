export default function UserCard({ user }) {
  return (
    <>
      <article className="card userCard">
        <div className="userTop">
          <div className="avatar" aria-hidden="true">
            {String(user?.name ?? '?')
              .trim()
              .slice(0, 1)
              .toUpperCase()}
          </div>
          <div className="userMeta">
            <div className="userName">{user?.name}</div>
            <div className="userNick">@{user?.username}</div>
          </div>
        </div>

        <div className="userRow">
          <span className="label">Email</span>
          <span className="value">{user?.email}</span>
        </div>
        <div className="userRow">
          <span className="label">City</span>
          <span className="value">{user?.address?.city}</span>
        </div>
        <div className="userRow">
          <span className="label">Company</span>
          <span className="value">{user?.company?.name}</span>
        </div>

        <div className="cardHint">Открыть профиль →</div>
      </article>
    </>
  )
}

