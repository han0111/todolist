import React, { useState } from "react";
import "./App.css";
import Card from "components/Card";

/**
 * 1. state 합치기 -> 하나 변경하면 나머지도 변경해야 함 & state 두 개라 함수도 2개 만들어야 함
 * 2. clickCompleteButtonHandler 와 clickDeleteButtonHandler 두 개가 거의 똑같아서 하나로 만들면 됨
 * 3. 이름을 cancel로 변경하는 것이 더 적절할 듯?
 * 4. 컴포넌트 분리
 */

function App() {
  const id = Math.random();

  // 병수 state
  const [todos, setTodos] = useState([
    {
      id: Math.random(),
      title: "하하핳",
      comment: "호호홓",
      isDone: false,
    },
    {
      id: Math.random(),
      title: "하하하 완료",
      comment: "후후훟 완료",
      isDone: true,
    },
  ]);

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  //onChange변수할당, 입력값 추가
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const commentChangeHandler = (event) => {
    setComment(event.target.value);
  };

  //추가하기 버튼 변수할당 및 form태그 Enter입력시 새로고침방지,카드추가
  const clickAddButtonHandler = (event) => {
    event.preventDefault();
    const newPlan = {
      id,
      title,
      comment,
    };
    //배열 불변성 유지
    setTodos([...todos, newPlan]);
    //추가하기버튼 누른 후 내용삭제
    setTitle("");
    setComment("");
  };

  //삭제 버튼 변수할당 및 카드삭제
  const clickRemoveButtonHandler = (id) => {
    const newPlans = todos.filter((plan) => plan.id !== id);
    setTodos(newPlans);
  };

  const completeButtonHandler = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className="layout">
      <div className="container">
        <div>My Todo List</div>
        <div>React</div>
      </div>
      <form>
        <div className="add-form">
          <div className="input-group">
            <label className="form-label">제목</label>
            <input
              className="input"
              value={title}
              onChange={titleChangeHandler}
            />

            <label className="form-label">내용</label>
            <input
              className="input"
              value={comment}
              onChange={commentChangeHandler}
            />
          </div>

          <button className="add-button" onClick={clickAddButtonHandler}>
            추가하기
          </button>
        </div>
      </form>
      <h1>working..🐢</h1>
      <div className="app-style">
        {todos
          .filter((todo) => !todo.isDone)
          .map((item) => {
            return (
              <Card
                item={item}
                clickRemoveButtonHandler={clickRemoveButtonHandler}
                completeButtonHandler={completeButtonHandler}
              />
              // <div key={item.id} className="component-style">
              //   <h2>{item.title}</h2>
              //   <div>{item.comment}</div>
              //   <div className="btn">
              //     <button
              //       className="red-btn"
              //       onClick={() => clickRemoveButtonHandler(item.id)}
              //     >
              //       삭제하기
              //     </button>
              //     <button
              //       className="green-btn"
              //       onClick={() => completeButtonHandler(item.id)}
              //     >
              //       {/* 완료 */}
              //       {item.isDone ? "취소" : "완료"}
              //     </button>
              //   </div>
              // </div>
            );
          })}
      </div>

      {/* Done 컨테이너 */}
      <h1>Done!!!🐇</h1>
      <div className="app-style">
        {todos
          .filter((todo) => !!todo.isDone)
          .map((item) => {
            return (
              <Card
                item={item}
                clickRemoveButtonHandler={clickRemoveButtonHandler}
                completeButtonHandler={completeButtonHandler}
              />
              // <div key={item.id} className="component-style">
              //   <h2>{item.title}</h2>
              //   <div>{item.comment}</div>
              //   <div className="btn">
              //     <button
              //       className="red-btn"
              //       onClick={() => clickRemoveButtonHandler(item.id)}
              //     >
              //       삭제하기
              //     </button>
              //     <button
              //       className="green-btn"
              //       onClick={() => completeButtonHandler(item.id)}
              //     >
              //       {item.isDone ? "취소" : "완료"}
              //     </button>
              //   </div>
              // </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
