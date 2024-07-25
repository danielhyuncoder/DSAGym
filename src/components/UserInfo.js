import React, { useEffect, useState } from 'react'
import '../css/UserInfo.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../axios';
const UserInfo = () => {
   const {uid} = useParams();
   const navigate=useNavigate();
   const [userData, setUserData]=useState(null);
   const [totalProblems, setTotalProblems]= useState(null)
   useEffect(() => {
       axios.post('/userdata', {_id:uid}).then(res=>{
          if (res.data.length===1) {
             navigate('/');
          } else {
            setUserData(res.data[0])
            setTotalProblems(res.data[1]);
          }
       })
   }, [])
  return (
    <div className="userContainer">
        {userData ? (
            <div>
            <div className="col">
                 <div className='displayBlock1'>
                    <div>
                        <h1>{userData.email}</h1>
                    </div>
                 </div>
                 <div className='displayBlock2'>
                    <div>
                    <h2 style={{color: "blue"}}>
                        Total Problems ({(userData.easySolved+userData.mediumSolved+userData.hardSolved).toString()+"/"+(totalProblems.easy+totalProblems.medium+totalProblems.hard).toString()})
                      </h2>
                      <div className='progressBar'>
                        <div style={{
                            backgroundColor: "green",
                            width: (((userData.easySolved+userData.mediumSolved+userData.hardSolved)/Math.max(1,(userData.easySolved+userData.mediumSolved+userData.hardSolved)))*100).toString()+"%",
                            height:"100%"
                        }}></div>
                        <div style={{
                            backgroundColor: "lightgray",
                            width: (((1-((userData.easySolved+userData.mediumSolved+userData.hardSolved)/Math.max(1,(userData.easySolved+userData.mediumSolved+userData.hardSolved))))*100)).toString()+"%",
                            height:"100%"
                        }}></div>
                      </div>

                      <h2 style={{color: "green"}}>
                        Easy Problems ({userData.easySolved.toString()+"/"+totalProblems.easy.toString()})
                      </h2>
                      <div className='progressBar'>
                        <div style={{
                            backgroundColor: "green",
                            width: ((userData.easySolved/Math.max(1,totalProblems.easy))*100).toString()+"%",
                            height:"100%"
                        }}></div>
                        <div style={{
                            backgroundColor: "lightgray",
                            width: (((1-(userData.easySolved/Math.max(1,totalProblems.easy)))*100)).toString()+"%",
                            height:"100%"
                        }}></div>
                      </div>
                      <h2 className="mediumYellow">
                        Medium Problems ({userData.mediumSolved.toString()+"/"+totalProblems.medium.toString()})
                      </h2>
                      <div className='progressBar'>
                        <div style={{
                            backgroundColor: "green",
                            width: ((userData.mediumSolved/Math.max(1,totalProblems.medium))*100).toString()+"%",
                            height:"100%"
                        }}></div>
                        <div style={{
                            backgroundColor: "lightgray",
                            width: (((1-(userData.mediumSolved/Math.max(1,totalProblems.medium)))*100)).toString()+"%",
                            height:"100%"
                        }}></div>
                      </div>
                      <h2 style={{color:"red"}}>
                        Hard Problems ({userData.hardSolved.toString()+"/"+totalProblems.hard.toString()})
                      </h2>
                      <div className='progressBar'>
                        <div style={{
                            backgroundColor: "green",
                            width: ((userData.hardSolved/Math.max(1,totalProblems.hard))*100).toString()+"%",
                            height:"100%"
                        }}></div>
                        <div style={{
                            backgroundColor: "lightgray",
                            width: (((1-(userData.hardSolved/Math.max(1,totalProblems.hard)))*100)).toString()+"%",
                            height:"100%"
                        }}></div>
                      </div>
                    </div>
                 </div>
            </div>
            <div className="col">
                 <div className="displayBlock3">
                    <div>
                        <h2 style={{color: "blue"}}>Problems Solved: </h2>
                        <div className='problemsList'>
                            {userData.problemsSolved.map(problem => (
                                <div className="problemElement" onClick={()=>{
                                    navigate('/problem/'+problem.name.split(" ").join("_"))
                                }}>
                                    <div>
                                    <h2 style={{
                                        color: (problem.difficulty==='Easy'?"green":(problem.difficulty==='Medium'?"gold":problem.difficulty==='Hard'?"red":""))
                                    }}>{problem.name}</h2>
                                    <h2 style={{
                                        color: (problem.difficulty==='Easy'?"green":(problem.difficulty==='Medium'?"gold":problem.difficulty==='Hard'?"red":""))
                                    }}>{problem.difficulty}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
            </div>
        </div>
        ) : (
            <>Loading...</>
        )}
    </div>
  )
}

export default UserInfo