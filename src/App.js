
import {Container,Row,Col} from "react-bootstrap";
import {Routes, Route} from "react-router-dom";
import Signup from './components/Signup';
import Home from "./components/Home";

import { UserAuthContextProvider } from "./context/UserAuthContext";
import LoginForm from "./components/LoginForm";
// import ChatBox from "./components/ChatBox";

function App() {
  return (
  <Container>
    <Row>
      <Col>
      <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/home" element={<Home/>}/> 
        {/* <Route path="/ChatBox" element={<ChatBox/>}/>  */}


      </Routes>
      </UserAuthContextProvider>
      </Col>
    </Row>
  </Container>      
  
  );
}

export default App;
