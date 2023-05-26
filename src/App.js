import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Counter } from "./Component/Counter";

export function App() {
  const [currentData, setcurrentData] = useState("");

  const [inputData, setinputData] = useState("");

  const [timer, setTimer] = useState(false);

  const [correctData, setcorrectData] = useState(0);

  const [wrongData, setwrongData] = useState(0);

  const [total, setTotal] = useState(0);

  const [accuracy, setaccuracy] = useState(0)



  let generateData = () => {
    let char = "helloworld";
    let str = "";

    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < Math.random() * 5; i++) {
        str += char.charAt(Math.floor(Math.random() * char.length));
      }

      str = str + " ";
    }

    str = str.trim();

    return str;
  }

  let handleInput = (e) => {
    setTotal(total + 1);
    let arr = e.target.value;
    setinputData(e.target.value);

    setTimer(true);
    let count = 1;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === currentData[i]) {
        setcorrectData(count++);
      } else {
        setwrongData(wrongData + 1);
      }
    }

    if (e.target.value === currentData) {
      setTimeout(() => {
        setinputData("");
        let random = generateData();
        setcurrentData(random);

        let WPM = total / 5 / 60;
        let NWPM = (total - wrongData) / 5 / 60

        let a = Math.floor((NWPM * 100) / WPM);
        setaccuracy(a)
      }, 1500);
    }

  }


  console.log(accuracy)



 
  const inputColor = () => {
    if (currentData.indexOf(inputData) !== -1) {
      if (currentData === inputData) {
        return "green";
      }
      return "white";
    }
    return "red";
  };
  const color = () => {
    if (currentData.indexOf(inputData) !== -1) {
      if (currentData === inputData) {
        return "white";
      }
      return "black";
    }
    return "white";
  };
  let nextData = currentData[0];
  for (let i = 0; i < currentData.length; i++) {
    if (currentData[i] === inputData[i]) {
      nextData = currentData[i + 1];
    }
  }

  useEffect(() => {
    let random = generateData();
    setcurrentData(random);
    setInterval(() => {
      let random = generateData();
      setcurrentData(random);
    }, 300000);
  }, []);

  return (
    <div className="main_container"
      style={{
        height: "720px",
        border: "5px dotted black"
      }}>


      <h1 style={{
        color: "grey", fontFamily: "sans-serif", fontStyle: "italic", textAlign: "center"
      }} >
        Typing Master
      </h1>
      <Counter timer={timer} />
      <Container style={{ width: "100%"}}>
        <img
          style={{ display: "block", margin: "auto",border:"3px dotted red" }}
          src="https://media.giphy.com/media/3oKIPcqmx1mpCOJJp6/giphy.gif"
          className="img-fluid"
          alt="png"
        
        />
      </Container>

      <Container
        style={{
          width: "30%",
          height: "45px",
          marginBottom: "10px",
          borderRadius: "0",
          backgroundColor: "grey",
          margin: "auto"
        }}
      >
        <h2 style={{ color: "white", textAlign: "center" }}>{currentData}</h2>
      </Container>

      <Container
        style={{ display: "flex", width: "100%", marginBottom: "10px" }}
      >
        <div style={{ display: "flex", width: "auto", margin: "auto", marginTop: "10px" }}>


          <h3 style={{ margin: "auto" }} > Type: </h3>

          <Button
            style={{


              fontWeight: "500",
              fontSize: "20px",
              marginRight: "0px",
              padding: "0 10px 0 10px",
              borderRadius: "0",
            }}
          >
            {nextData === " " ? "SPACE" : nextData}
          </Button>
        </div>
      </Container>

      <Container >
        <Form.Control
          style={{
            width: "100%",
            height: "80px",
            margin: "auto",
           
            color: color(),
            fontSize: "24px",
            fontWeight: "500",
            textAlign: "center",
            marginBottom: "30px",
            backgroundColor: inputColor(),
          }}
          size="lg"
          type="text"
          placeholder="Start Typing Here..."
          onChange={handleInput}
          value={inputData}
        />
      </Container>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          justifyItems: "center",
        }}
      >
        <h4> Total:-{total} </h4>
        <h4> Accuracy:-{accuracy}% </h4>
        <h4> WPM:-{correctData} </h4>
      </Container>
    </div>
  );
}
