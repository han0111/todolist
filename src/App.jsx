import React, { useState } from "react";
import "./App.css";
// import Card from "components/Card";
import styled  from "styled-components";

const StBox = styled.div`
max-width: 1200px;
min-width: 800px;
margin: 0 auto;
`
const Container = styled.div`
  align-items: center;
  border: 1px solid #ddd;
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 0 20px;
`

const AddForm = styled.form`
  background-color: #eee;
  border-radius: 12px;
  justify-content: space-between;
  margin: 0 auto;
  padding: 30px;

  align-items: center;
  display: flex;
  gap: 20px;
`
const InputGroup = styled.div`
  align-items: center;
  display: flex;
  gap: 20px;
`
const Input = styled.input`
    border: none;
  border-radius: 12px;
  height: 40px;
  padding: 0 12px;
  width: 240px;
`
const FormLabel = styled.label`
  font-size: 16px;
  font-weight: 700;
`
const AddButton = styled.button`
  background-color: teal;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  height: 40px;
  width: 140px;
  cursor: pointer;
  &:hover {
    border: 2px solid green;
    transform: scale(1.1);
  }
`
const H1 = styled.h1`
  margin-left: 30px;
`

const AppStyle = styled.div`
  padding-left : 2rem;
  gap : 12px;
  display : grid;
  grid-template-columns: repeat(3,1fr);
`
const ComponentStyle = styled.div`
  width: 270px;
  height: 150px;
  border: 4px solid teal;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
`

const Btn = styled.div`
  display: flex;
  flex-direction: row;
`

const ColorBtn = styled.button`
  background-color: transparent;
  border: 2px solid ${(props) => props.bordercolor};
  border-radius: 10px;
  width: 50%;
  height: 40px;

  margin : 20px 5px auto 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);}
`


function App() {
  const id = Math.random();

  // state
  const [todos, setTodos] = useState([
    {
      id: Math.random(),
      title: "리액트 공부하기",
      comment: "리액트 기초를 공부해봅시다.",
      isDone: false,
    },
    {
      id: Math.random(),
      title: "공부 완료",
      comment: "공부 완료하였습니다.",
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
    const newTodos = {
      id,
      title,
      comment,
    };
    //배열 불변성 유지
    setTodos([...todos, newTodos]);
    //추가하기버튼 누른 후 내용삭제
    setTitle("");
    setComment("");
  };

  //삭제 버튼 변수할당 및 카드삭제
  const removeButtonHandler = (id) => {
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
    <StBox>
      <Container>
        <div>My Todo List</div>
        <div>React</div>
      </Container>
        <AddForm>
        <InputGroup>
            <FormLabel>제목</FormLabel>
            <Input
              value={title}
              onChange={titleChangeHandler}
            />

            <FormLabel>내용</FormLabel>
            <Input
              value={comment}
              onChange={commentChangeHandler}
            />
          </InputGroup>

          <AddButton onClick={clickAddButtonHandler}>
            추가하기
          </AddButton>
        </AddForm>

      <H1>working..🐢</H1>      
      <AppStyle>
        {todos
          .filter((todo) => !todo.isDone)
          .map((item) => {
            //버튼의 색
            const borderColorList = ['red', 'green'] 
            //버튼의 색을 넣으면, 버튼내용을 반환
            const getBtnName = (color) => {
              switch(color) {
                case 'red':
                return "삭제하기";
                case 'green':
                  return `${item.isDone ? "취소" : "완료"}`;
              }
            }
            return (              
              <ComponentStyle 
              key={item.id}
              item={item}
              clickRemoveButtonHandler={removeButtonHandler}
              completeButtonHandler={completeButtonHandler}>
              <h2>{item.title}</h2>
              <div>{item.comment}</div>
              <Btn>          
              {borderColorList.map((color)=>{
                return <ColorBtn
                  onClick={() => color === "red"?removeButtonHandler(item.id):completeButtonHandler(item.id)}                  
                  bordercolor = {color}
                  >
                    {getBtnName(color)}
                  </ColorBtn>
              })}  
              </Btn>
              </ComponentStyle>

            );
          })}
      </AppStyle>

      {/* Done 컨테이너 */}
      <H1>Done!!!🐇</H1>
      <AppStyle>
        {todos
          .filter((todo) => !!todo.isDone)
          .map((item) => {
            //버튼의 색
            const borderColorList = ['red', 'green'] 
            //버튼의 색을 넣으면, 버튼내용을 반환
            const getBtnName = (color) => {
              switch(color) {
                case 'red':
                return "삭제하기";
                case 'green':
                  return `${item.isDone ? "취소" : "완료"}`;
              }
            }
            
            return (
              <ComponentStyle  
                key={item.id}
                item={item}
                clickRemoveButtonHandler={removeButtonHandler}
                completeButtonHandler={completeButtonHandler}>
              <h2>{item.title}</h2>
              <div>{item.comment}</div>
              <Btn>
              {borderColorList.map((color)=>{
                return <ColorBtn
                  onClick={() => color === "red"?removeButtonHandler(item.id):completeButtonHandler(item.id)}                  
                  bordercolor = {color}
                  >
                    {getBtnName(color)}
                  </ColorBtn>
              })}  
              </Btn>
            </ComponentStyle>


            );
          })}
      </AppStyle>
    </StBox>
  );
}

export default App;
