import { BrowserRouter, Routes, Route } from "react-router-dom";
import Problems from "./components/Problems";
import Header from "./components/Header";
import { useEffect } from "react";
import axios from './axios'
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import app from "./firebase";
import { login, logout } from "./redux/userSlice";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import UserInfo from "./components/UserInfo";
import AdminDashboard from "./components/AdminDashboard";
import AddProblem from "./components/AddProblem";
import EditProblem from "./components/EditProblem";
import Problem from "./components/Problem";

function App() {
  const auth = getAuth(app);
  const user = useSelector(state=>state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
      onAuthStateChanged(auth, authUser=>{
        if (authUser){
           axios.post("/user/info", authUser).then(res=>{
            res.data[0]['uid']=authUser.uid;
            dispatch(login(res.data[0]));
           })
        } else {
           dispatch(logout());
        }
      })
  }, [])
  return (
    <BrowserRouter>
     <div>
       <Header/>
       <Routes>
          <Route exact path="/" element={<Problems/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/profile/:uid" element={<UserInfo/>}/>
          {user ? (
            <>
             <>
             {user.admin ? (
              <>
                <Route exact path="/admin/dashboard" element={<AdminDashboard/>} />
                <Route exact path="/admin/add" element={<AddProblem/>} />
                <Route exact path="/admin/edit/:name" element={<EditProblem/>} />
              </>
          ) : (
              <>
              </>
          )}
             </>
             <Route exact path="/problem/:name" element={<Problem/>}/>
            </>
          ) : (
            <>
            </>
          )}
       </Routes>
     </div>
    </BrowserRouter>
  );
}

export default App;