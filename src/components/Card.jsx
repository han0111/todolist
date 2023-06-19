function Card({ item, clickRemoveButtonHandler, completeButtonHandler }) {
  return (
    <div key={item.id} className="component-style">
      <h2>{item.title}</h2>
      <div>{item.comment}</div>
      <div className="btn">
        <button
          className="red-btn"
          onClick={() => clickRemoveButtonHandler(item.id)}
        >
          삭제하기
        </button>
        <button
          className="green-btn"
          onClick={() => completeButtonHandler(item.id)}
        >
          {/* 완료 */}
          {item.isDone ? "취소" : "완료"}
        </button>
      </div>
    </div>
  );
}

export default Card;
