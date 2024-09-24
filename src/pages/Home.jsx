import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [inputText, setInputText] = useState("");  
  const navigate = useNavigate();
  let timerId = null;

  const throttle = _.throttle(() => {
    console.log("API 요청 실행! 2000ms 동안 추가요청 안받음!");
  }, 2000)

  const debounce = _.debounce(() => {
    console.log("마지막 요청으로부터 2000ms 지났으므로 API 요청 실행!")
  }, 2000)

  const handleMove = () => {
    navigate("/company");
  }

  useEffect(() => {
    return () => {
      // 페이지 벗어날 때, unmount 될 때
      if(timerId) clearTimeout(timerId);
    }
  }, []);

  const handleSearchText = useCallback(_.debounce((text) => setSearchText(text), 2000), []);

  const handleChange = (e) => {
    setInputText(e.target.value);
    handleSearchText(e.target.value);
  };  

  return (
    <div>
      <h2>Button 이벤트 예제</h2>
      <button onClick={throttle}>쓰로틀링 버튼</button>
      <button onClick={debounce}>디바운싱 버튼</button>
      <div>
        <button onClick={handleMove}>페이지 이동</button>
      </div>
      <h2>디바운싱 예제</h2>
      <input
        placeholder="입력값을 넣고 디바운싱 테스트를 해보세요."
        style={{ width: "300px" }}
        onChange={handleChange}
        type="text"
      />
        <p>Search Text: {searchText}</p>
        <p>Input Text: {inputText}</p>
    </div>
  )
}

export default Home