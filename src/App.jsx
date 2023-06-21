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

const RedBtn = styled.button`
    background-color: transparent;
  border: 2px solid red;
  border-radius: 10px;
  width: 50%;
  height: 40px;
  margin : 20px 5px auto 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`
const GreenBtn = styled.button`
  background-color: transparent;
  border: 2px solid green;
  border-radius: 10px;
  width: 50%;
  height: 40px;

  padding: 7px 32px 7px 32px;
  margin : 20px 5px auto 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`
/**
 * 1. state 합치기 -> 하나 변경하면 나머지도 변경해야 함 & state 두 개라 함수도 2개 만들어야 함
 * 2. clickCompleteButtonHandler 와 clickDeleteButtonHandler 두 개가 거의 똑같아서 하나로 만들면 됨
 * 3. 이름을 cancel로 변경하는 것이 더 적절할 듯?
 * 4. 컴포넌트 분리
 */

function App() {
  const id = Math.random();

  // state
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
            return (
              // <Card
              //   item={item}
              //   clickRemoveButtonHandler={removeButtonHandler}
              //   completeButtonHandler={completeButtonHandler}
              // />
              
              <ComponentStyle 
              key={item.id}
              item={item}
              clickRemoveButtonHandler={removeButtonHandler}
              completeButtonHandler={completeButtonHandler}>
              <h2>{item.title}</h2>
              <div>{item.comment}</div>
              <Btn>             
               <RedBtn
                  onClick={() => removeButtonHandler(item.id)}
                >
                  삭제하기
                </RedBtn>
                <GreenBtn
                  onClick={() => completeButtonHandler(item.id)}
                >
                  {/* 완료 */}
                  {item.isDone ? "취소" : "완료"}
                </GreenBtn>
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
            return (
              // <Card
              //   item={item}
              //   clickRemoveButtonHandler={removeButtonHandler}
              //   completeButtonHandler={completeButtonHandler}
              // />

              <ComponentStyle  
                key={item.id}
                item={item}
                clickRemoveButtonHandler={removeButtonHandler}
                completeButtonHandler={completeButtonHandler}>
              <h2>{item.title}</h2>
              <div>{item.comment}</div>
              <Btn>
                <RedBtn
                  onClick={() => removeButtonHandler(item.id)}
                >
                  삭제하기
                </RedBtn>
                <GreenBtn
                  onClick={() => completeButtonHandler(item.id)}
                >
                  {/* 완료 */}
                  {item.isDone ? "취소" : "완료"}
                </GreenBtn>
              </Btn>
            </ComponentStyle>


            );
          })}
      </AppStyle>
    {/* </div> */}
    </StBox>
  );
}

export default App;
