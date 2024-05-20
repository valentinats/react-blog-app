import deleteImg from '/src/assets/delete.svg';

export function Post({ todo, onDelete, onToggle }) {
  return (
    <div className="post" id={todo.id}>
      <p className="post__title">■ {todo.title}</p>
      <p className="post__text">{todo.text}<img className="post__img" src={todo.img} /></p>
      <div className="action__panel">
        <div className="post__date">{todo.createdAt}</div>
        <div>
          <span
            onClick={onToggle}
            className={`like__btn ${todo.completed ? "liked" : ""}`}
          ></span>
          <button onClick={onDelete} className="delete__btn">
            <img src={deleteImg} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
