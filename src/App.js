import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';

import PayloadPage from "./Component/PayloadPage/PayloadPage";
import DurationPage from "./Component/DurationPage/DurationPage";
import NumOfSeatsPage from "./Component/NumOfSeatsPage/NumOfSeatsPage";
import DatePage from "./Component/DatePage/DatePage";
import SlotsPage from "./Component/SlotSPage/SlotsPage";

function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path="/" element={<PayloadPage/>}/>
      <Route path="/duration" element={<DurationPage/>}/>
      <Route path="/seats" element={<NumOfSeatsPage/>}/>
      <Route path="/date" element={<DatePage/>} />
      <Route path="/slots" element={<SlotsPage/>} />
      
    </Routes>
   </Router>
   </>
  );
}

export default App;
