import Comment from "..//Comment"

export default function Comments({ comments, className }) {
  return (
    <ul className={' ' + className}>
      {comments.map(comment => (
        <li
          key={comment.id}
          className='my-6 border-t border-gray-200 pt-6'
        >
          <Comment
            key={comment.id}
            comment={comment}
            user={comment.user}
          />
        </li>
      ))}
    </ul>
  )
}