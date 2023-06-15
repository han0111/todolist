import React, { useState } from 'react'
import "./App.css"

function App() {
  const id = Math.random();
  const [plans, setPlans] = useState(  
    [{id:id, title: "리액트공부하기", comment: "리액트 기초를 공부해봅시다"},]);

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  //onChange변수할당
  const titleChangeHandler = (event) => {
    setTitle(event.target.value)}
  const commentChangeHandler = (event) => {
    setComment(event.target.value);
  }
  
  //추가하기 버튼 변수할당 및 카드추가
  const clickAddButtonHandler = () => {
    const newPlan={
      id,
      title,
      comment,
    }
    //배열 불변성 유지
    setPlans([...plans,newPlan]);
    //추가하기버튼 누른 후 내용삭제
    setTitle("");
    setComment("");
  }

  //삭제 버튼 변수할당 및 카드삭제
  const clickRemoveButtonHandler = (id) => {
    const newPlans = plans.filter(plan=>plan.id !== id);
    setPlans(newPlans);
  }

  //완료 버튼 클릭이벤트
  const clickCompleteButtonHandler = (id) => {
    const completePlans = plans.filter((plan)=>plan.id !== id);
    const completeDonePlans = plans.filter((plan)=>plan.id === id);

    setPlans(completePlans);
    setDonePlans([...donePlans,...completeDonePlans]);
  }

  //Done 컨테이너 만들기
  const [donePlans, setDonePlans] = useState(  
    [{id:1, title: "리액트공부하기 완료", comment: "리액트 기초를 공부해봅시다 완료"},]);


  //Done 컨테이너 삭제 버튼 변수할당 및 카드삭제
  const clickDoneRemoveButtonHandler = (id) => {
    const newDonePlans = donePlans.filter(donePlan=>donePlan.id !== id);
    setDonePlans(newDonePlans);
  }

  //취소 버튼 클릭이벤트
  const clickDeleteButtonHandler = (id) => {
    const deleteDonePlans = donePlans.filter((plan)=>plan.id !== id);
    const deletePlans = donePlans.filter((plan)=>plan.id === id)

    setDonePlans(deleteDonePlans);
    setPlans([...plans,...deletePlans])
  }

  return (
    <div className="layout">
      <div className = "container">
        <div>My Todo List</div>
        <div>React</div>
      </div>
      {/* <form > */}
      <div className = "add-form">
        <div className="input-group">
        <label className="form-label">제목</label>
        <input 
        className="input"
        value={title} 
        onChange={titleChangeHandler}/>

        <label className="form-label">내용</label>
        <input 
        className="input"
        value = {comment} 
        onChange = {commentChangeHandler}/></div>

        <button className="add-button" onClick={clickAddButtonHandler}>추가하기</button>
      </div>
      {/* </form> */}
      <h1>working..🐢</h1>
      <div className="app-style">
        {
          plans.map((item)=>{
            return (
              <div key={item.id} className="component-style">
                <h2>{item.title}</h2>
                <div>{item.comment}</div>
                <div className="btn">
                <button className="red-btn" onClick={() => clickRemoveButtonHandler(item.id)}>삭제하기</button>
                <button className="green-btn" onClick={() => clickCompleteButtonHandler(item.id)}>완료</button>
                </div>
              </div>
            )
          })
        }
      </div>

      {/* Done 컨테이너 */}
      <h1>Done!!!🐇</h1>
      <div className="app-style">
        {donePlans.map((item)=>{
          return (
            <div key={item.id} className="component-style">
            <h2>{item.title}</h2>
            <div>{item.comment}</div>
            <div className="btn">
            <button className="red-btn" onClick={() => clickDoneRemoveButtonHandler(item.id)}>삭제하기</button>
            <button className="green-btn" onClick={() => clickDeleteButtonHandler(item.id)}>취소</button>
            </div>
          </div>
          )
        })}       
      </div>
    </div>
  )
}

export default App