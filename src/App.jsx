import React from "react";
import { useState, useEffect } from "react";
import { addTodo, deleteTodo, getTodos, updateTodo } from "./js/firebase";
import { getNormalizedTodos } from "./utils/get-normalized-todos";
import { v4 as uuidv4 } from "uuid";
import { Post } from "./components/Post/Post";
import "./App.css";
import flowerImg from '/src/assets/flower.svg';
import sidebarImg from '/src/assets/sidebarimage.png';

function App() {
  const [todosIds, setTodosIds] = useState(null);
  const [todosById, setTodosById] = useState({});
  const [isTodosLoading, setTodosLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoText, setTodoText] = useState("");
  const [titleCount, setTitleCount] = useState(0);
  const [textCount, setTextCount] = useState(0);
  const [titleCounterColor, setTitleCounterColor] = useState("white");
  const [textCounterColor, setTextCounterColor] = useState("white");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setIsError(false);
    setTodosLoading(true);

    getTodos()
      .then((todos) => {
        const [ids, byIds] = getNormalizedTodos(todos);

        setTodosLoading(false);
        setTodosIds(ids);
        setTodosById(byIds);
      })
      .catch(() => {
        setIsError(true);
        setTodosLoading(false);
      });
  }, []);

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitleCount(value.length);

    if (value.length > 100) {
      setTitleCounterColor("#86434b");
      setButtonDisabled(true);
    } else {
      setTitleCounterColor("white");
      setButtonDisabled(false);
    }
  };

  const handleTextChange = (event) => {
    const value = event.target.value;
    setTextCount(value.length);

    if (value.length > 200) {
      setTextCounterColor("#86434b");
      setButtonDisabled(true);
    } else {
      setTextCounterColor("white");
      setButtonDisabled(false);
    }
  };

  function clearInputs() {
    setTodoTitle("");
    setTodoText("");

    setTitleCount(0);
    setTextCount(0);

    setTitleCounterColor("white");
    setTextCounterColor("white");
  }

  function handleDeleteTodo(id) {
    setTodosIds(todosIds.filter((todoId) => todoId !== id));
    deleteTodo(id);
  }

  function handleToggleTodo(id) {
    const todo = {
      ...todosById[id],
      completed: !todosById[id].completed,
    };
    setTodosById({
      ...todosById,
      [id]: todo,
    });

    updateTodo(todo);
  }

  function handleInputTodoTitleChange(event) {
    setTodoTitle(event.target.value);
  }

  function handleInputTodoTextChange(event) {
    setTodoText(event.target.value);
  }

  function handleAddTodoBtnClick() {
    const currentDate = new Date();

    const now =
      `${currentDate.getDate().toString().padStart(2, "0")}.${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}.${currentDate.getFullYear()}` +
      "," +
      " " +
      `${currentDate.getHours().toString().padStart(2, "0")}` +
      ":" +
      `${currentDate.getMinutes().toString().padStart(2, "0")}`;

    const trimmedTitle = todoTitle.trim();
    const trimmedText = todoText.trim();

    if (trimmedTitle.length <= 100 && trimmedText.length <= 200) {
      const todo = {
        id: uuidv4(),
        title: todoTitle,
        text: todoText,
        completed: false,
        createdAt: now,
      };

      setTodosById({
        ...todosById,
        [todo.id]: todo,
      });

      setTodosIds([todo.id, ...todosIds]);

      addTodo(todo);

      setTodoTitle("");
      setTodoText("");

      setTitleCount(0);
      setTextCount(0);
    }
  }

  function setTitleValue(postTitle) {
    const titlearea = document.getElementById("title");
    titlearea.style.height = 0;
    titlearea.value = postTitle;
    titlearea.style.height = titlearea.scrollHeight + "px";
  }

  function setTextValue(postText) {
    const textarea = document.getElementById("text");
    textarea.style.height = 0;
    textarea.value = postText;
    textarea.style.height = textarea.scrollHeight + "px";
  }

  return (
    <div className="container">
      <div className="page__wrapper">
        <div className="side">
          <div className="sideboxline" />
          <div className="sidebox" />
          <div className="sidereminderwrap">
            <div className="remindertext">
              <b>WELCOME,</b>
              <br />
              <a href="">have a nice day!</a>
            </div>
            <div className="sidereminderbox">
              <div className="srline" />
              <button className="srbutton1">good</button>
              <button className="srbutton2">close</button>
            </div>
          </div>
          <div className="sidebox2">
            <b>valentina</b> ts <b>#</b>
          </div>
          <div className="sidebox3">blog</div>
          <div className="sideline">
            <div className="ninitial">
              <img src={flowerImg} />
            </div>
            <div className="n">
              <div className="nline" />
              <a
                href=""
                className="tablink tabzact"
                title="home"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  style={{
                    msTransform: "rotate(360deg)",
                    WebkitTransform: "rotate(360deg)",
                    transform: "rotate(360deg)",
                  }}
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                  className="iconify"
                  data-icon="material-symbols:circle"
                  data-inline="false"
                >
                  <path
                    fill="currentColor"
                    d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
                  />
                </svg>
              </a>
              <a
                href="https://github.com/valentinats"
                title="github"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  style={{
                    msTransform: "rotate(360deg)",
                    WebkitTransform: "rotate(360deg)",
                    transform: "rotate(360deg)",
                  }}
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                  className="iconify"
                  data-icon="material-symbols:circle"
                  data-inline="false"
                >
                  <path
                    fill="currentColor"
                    d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
                  />
                </svg>
              </a>
              <a
                href="https://t.me/equalscore"
                title="telegram"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  style={{
                    msTransform: "rotate(360deg)",
                    WebkitTransform: "rotate(360deg)",
                    transform: "rotate(360deg)",
                  }}
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                  className="iconify"
                  data-icon="material-symbols:circle"
                  data-inline="false"
                >
                  <path
                    fill="currentColor"
                    d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
                  />
                </svg>
              </a>
              <a
                href="mailto:vczydenzhapova@mail.ru"
                title="email"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  style={{
                    msTransform: "rotate(360deg)",
                    WebkitTransform: "rotate(360deg)",
                    transform: "rotate(360deg)",
                  }}
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                  className="iconify"
                  data-icon="material-symbols:circle"
                  data-inline="false"
                >
                  <path
                    fill="currentColor"
                    d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
                  />
                </svg>
              </a>
            </div>
            <div className="ntext">
              this is my
              <br />
              favorite
              <br />
              place ✦
            </div>
          </div>
          <div className="scribblebox">
            <div className="sidescribble1">v</div>
            <div className="sidescribble2">a</div>
            <div className="sidescribble3">a</div>
            <div className="sidescribble4">t</div>
          </div>
          <div className="sidecontainer">
            <div className="sidetitle">
              talk about the things you really want said.
            </div>
            <div className="descriptionbox">
              <div className="descheart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="0.88em"
                  height="1em"
                  style={{
                    msTransform: "rotate(360deg)",
                    WebkitTransform: "rotate(360deg)",
                    transform: "rotate(360deg)",
                  }}
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 448 512"
                  className="iconify"
                  data-icon="fa-solid:hashtag"
                  data-inline="false"
                >
                  <path
                    fill="currentColor"
                    d="m440.667 182.109l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l14.623-81.891C377.123 38.754 371.468 32 363.997 32h-40.632a12 12 0 0 0-11.813 9.891L296.175 128H197.54l14.623-81.891C213.477 38.754 207.822 32 200.35 32h-40.632a12 12 0 0 0-11.813 9.891L132.528 128H53.432a12 12 0 0 0-11.813 9.891l-7.143 40C33.163 185.246 38.818 192 46.289 192h74.81L98.242 320H19.146a12 12 0 0 0-11.813 9.891l-7.143 40C-1.123 377.246 4.532 384 12.003 384h74.81L72.19 465.891C70.877 473.246 76.532 480 84.003 480h40.632a12 12 0 0 0 11.813-9.891L151.826 384h98.634l-14.623 81.891C234.523 473.246 240.178 480 247.65 480h40.632a12 12 0 0 0 11.813-9.891L315.472 384h79.096a12 12 0 0 0 11.813-9.891l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l22.857-128h79.096a12 12 0 0 0 11.813-9.891zM261.889 320h-98.634l22.857-128h98.634l-22.857 128z"
                  />
                </svg>
              </div>
              <div className="description">
                <a href="">hello</a>, user.
                <br />
                say something.
              </div>
            </div>
            <div className="attached" />
            <div className="sidebarimage">
              <img src={sidebarImg} />
            </div>
          </div>
        </div>
        <div className="posts__container">
          <div className="form__section">
            <div className="form__cont">
              <div className="post__form">
                <form
                  className="form__inner"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <textarea
                    id="title"
                    className="js-post-title-input form__title"
                    type="text"
                    value={todoTitle}
                    onChange={handleTitleChange}
                    onInput={(event) => {
                      setTitleValue(event.target.value);
                      handleInputTodoTitleChange(event);
                    }}
                    cols={1}
                    placeholder="Заголовок"
                    spellCheck="true"
                  />
                  <p
                    className="title__counter"
                    style={{ color: titleCounterColor }}
                  >
                    {titleCount}/100
                  </p>
                  <textarea
                    id="text"
                    className="js-post-text-input form__textarea"
                    name="story"
                    type="text"
                    value={todoText}
                    onChange={handleTextChange}
                    onInput={(event) => {
                      setTextValue(event.target.value);
                      handleInputTodoTextChange(event);
                    }}
                    cols={1}
                    placeholder="Добавьте что-нибудь"
                    spellCheck="true"
                  />
                  <p
                    className="text__counter"
                    style={{ color: textCounterColor }}
                  >
                    {textCount}/200
                  </p>
                  <div className="form__buttons">
                    <button
                      className="js-reset-post-button form__reset"
                      type="submit"
                      onClick={clearInputs}
                    >
                      очистить
                    </button>
                    <button
                      className="js-new-post-button form__button"
                      type="submit"
                      onClick={handleAddTodoBtnClick}
                      disabled={isButtonDisabled}
                    >
                      опубликовать
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="posts__section">
              <ol className="js-posts posts__list">
                <div className="posts">
                  {isError && <p>Произошла ошибка</p>}

                  {isTodosLoading && <p>В ленте пока нет ни одной записи</p>}

                  {todosIds &&
                    todosIds.map((id) => (
                      <Post
                        key={`${id}`}
                        todo={todosById[id]}
                        onDelete={() => handleDeleteTodo(id)}
                        onToggle={() => handleToggleTodo(id)}
                      />
                    ))}
                </div>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
