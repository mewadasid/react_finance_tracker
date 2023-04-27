import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Form from "./pages/finance/transactionForm/components/form";
import Displayuser from "./pages/finance/financeTable/components/displayUser";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/createTransaction" element={<Form />}></Route>
      <Route path="/user/:id" element={<Displayuser />}></Route>

      {/* <Route path="/user" element={<Userdisplay />}></Route>
      <Route path="/post" element={<Userpost />}></Route>
      <Route path="/user/createUser" element={<Usercreate />}></Route>
      <Route path="/post/createPost" element={<Postcreate />}></Route> */}
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
