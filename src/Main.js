import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { GroupCreatePage } from "./pages/GroupCreatePage";
import GroupListPage from "./pages/GroupListPage";

function Main() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          {/* GroupListPage가 하나의 페이지에서 Public, Private, Empty 상태를 처리 */}
          <Route path="/" element={<GroupListPage />} />
          <Route path="create-group" element={<GroupCreatePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Main;
