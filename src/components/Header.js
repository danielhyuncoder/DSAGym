import React from 'react'
import "../css/Header.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import app from '../firebase'

const Header = () => {
  const user=useSelector(state=>state.user.user)
  const auth=getAuth(app)
  const navigate = useNavigate()
  return (
    <div className="headerContainer">
        <div>
          <div className="hov" onClick={()=>navigate('/')}><h2 className="r">D</h2><h2 className="y">S</h2><h2 className="g">A</h2><h2>Gym</h2></div>
          <div>
             {user ? (
                <>
                  {user.admin?(
                    <button onClick={()=>{
                      navigate('/admin/dashboard');
                    }} className="headerBtn">Admin Panel</button>
                  ) : (
                    <></>
                  )}
                  <button onClick={()=>{
                    navigate('/profile/'+user._id);
                  }} className="headerBtn">Profile</button>
                  <button onClick={()=>{
                    signOut(auth)
                    navigate('/login')
                  }} className="headerBtn">
                     Sign Out
                  </button>
                </>
             ) : (
               <>
                  <button onClick={()=>navigate('/login')} className="headerBtn">
                    Login or Register
                  </button>

               </>
             )}
          </div>
        </div>
    </div>
  )
}

export default Header