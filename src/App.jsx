import { Route, Routes } from "react-router-dom";
// Pages:
import HomePage from "./Pages/HomePage";
import SigninPage from "./Pages/Auth/SigninPage";
import SignupPage from "./Pages/Auth/SignupPage";
import VerifyCodePage from "./Pages/Auth/VerifyCodePage";
// Modals:
import UpdateModal from "./Components/Modals/UpdateModal";
import DeleteModal from "./Components/Modals/DeleteModal";
// Contexts:
import { TodosContextProvider } from "./Context/TodosContext";
// Toastify:
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <TodosContextProvider>
      <div className="App bg-[#101010] text-white min-h-screen">
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify" element={<VerifyCodePage />} />
        </Routes>
        {/* Modals */}
        <UpdateModal />
        <DeleteModal />
        {/* Toast Container */}
        <ToastContainer />
      </div>
    </TodosContextProvider>
  )
}

export default App;