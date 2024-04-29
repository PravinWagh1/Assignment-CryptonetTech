import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';


import FetchAPI from './Components/fetchAPI';

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<FetchAPI />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }
function App() {
  return (
    <Container className="pt-4">
      {/* <div id="map"> */}
        <FetchAPI />
      {/* </div> */}
    </Container>
  );
}
export default App;
