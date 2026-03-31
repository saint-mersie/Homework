export default function PostCard({ post }) {
  return (
    <>
      <article className="card postCard">
        <div className="pill">User #{post?.userId}</div>
        <div className="postTitle">{post?.title}</div>
        <div className="postBody">{post?.body}</div>
        <div className="cardHint">Открыть пост →</div>
      </article>
    </>
  )
}

