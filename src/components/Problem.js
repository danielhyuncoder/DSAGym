import React, { useEffect, useState } from 'react'
import '../css/UserInfo.css'
import axios from '../axios'
import { useNavigate, useParams } from 'react-router-dom'
import ParaScanner from './ParaScanner'
import compile from '../library/SmoothQuestionSyntax'
import { useSelector } from 'react-redux'
import starterCode from '../library/StarterCode'
const Problem = () => {
  const navigate=useNavigate();
  const [problem, setProblem] = useState(null);
  const [description, setDescription] = useState(null);
  const [title, setTitle]= useState(null);
  const [difficulty, setDifficulty]= useState(null);
  const[testcase, setTestcase]=useState(null)
  const {name} = useParams();
  const[language, setLanguage] = useState("python");
  const[solved,setSolved]=useState(false);
  const[code, setCode]=useState(starterCode['python']);
  const[submit,setSubmit]=useState("Submit");
  const user = useSelector(state=>state.user.user)
  useEffect(() => {
      axios.post("/get/problem", {
        name: name.split("_").join(" ")
      }).catch(err=>{
         navigate("/");
      }).then(res=>{
        if (!res.data){
            navigate("/");
        }
        setTitle(res.data.name);
        setDifficulty(res.data.difficulty)
         setProblem(res.data);
         setDescription(compile(res.data.statement));
      })
      let realName=name.split("_").join(" ").toLowerCase();
      user.problemsSolved.map(prob=>{
         if (prob.name.toLowerCase()===realName){
            setSolved(true);
         }
      })
  }, [])
  return (
    <div className="userContainer">
        {problem &&description ? (
            <div>
            <div className="col">
               <div className="displayBlock3">
                      
                      <div style={{overflowY: "scroll"}}>
                        <div className="btnRow">
                        <button onClick={()=>{
                           setDescription(compile(problem.statement))
                        }} className="addProblemButton">Problem</button><button onClick={()=>{
                           setDescription(compile(problem.editorial))
                        }} className="addProblemButton">Editorial</button>
                        </div>
                        {solved?(<b style={{color:"green"}}>(Solved)</b>):(<></>)}
                      {title.length>0?<h2 style={{color: (difficulty==='Easy'?"green":difficulty==='Medium'?"gold":difficulty==='Hard'?"red":"")}}>{title} - {difficulty}</h2>:<></>}
                      {description.map(desc=>{
                          if (desc.type==='nt'){
                             return (
                                <p>{desc.content}</p>
                             )
                          } else if (desc.type==='mt') {
                              if (desc.bold){
                                  return (
                                    <ParaScanner txt={desc.content} color={desc.color} bold={desc.bold}/>
                                  )
                              } else {
                                return (
                                    <ParaScanner txt={desc.content} color={desc.color} bold={desc.bold}/>
                                  )
                              }
                          } else if (desc.type==='bn') {
                            return (
                               <div style={{color:desc.color, fontWeight: (desc.bold?"bold":"normal"),backgroundColor: desc.backgroundColor}} className="problemBox">
                                  <div>
                                    <ParaScanner txt={desc.content} color={desc.color} bold={false}/>
                                  </div>
                               </div>
                            )
                          }
                       })}
                      </div>
               </div>
            </div>
            <div className="col">
                 <div className="displayBlock3">
                    <div>
                        <div>

                        <select onChange={(e)=>{
                           setLanguage(e.target.value)
                           setCode(starterCode[e.target.value])
                        }}>
                           <option value="python">Python</option>
                           <option value="javascript">JavaScript</option>
                        </select>
                        </div>
                        <br/>
                        <textarea value={code} spellCheck="false" onChange={(e)=>setCode(e.target.value)} className="codeWritingArea" placeholder="Write your code here..."/> 
                        <div>
                        <button onClick={()=>{
                           setSubmit("Submitting...")
                            axios.post('/submit/problem', {
                              code: code,
                              name: name.split("_").join(" "),
                              lang: language,
                              uid:user.uid
                            }).then(res=>{
                              setSubmit("Submit")
                              setTestcase(res.data)
                              if (res.data.sucess===1) {
                                 setSolved(true);
                              }
                            });
                        }} className="addProblemButton">{submit}</button>
                        </div>
                        <div className="failedSubmissions">
                           <div>
                              {testcase?(
                                 <>
                                   {testcase.sucess===-1?(
                                    <>
                                       <h2 style={{color:"red"}}>{testcase.message}</h2>
                                       <p>Input: {testcase.testcase.input.split("|").join(",")}</p>
                                       <p style={{color:"red"}}>Output: {testcase.result}</p>
                                       <b style={{color:"green"}}>Expected: {testcase.testcase.expected}</b>
                                    </>
                                   ) : (
                                    <>
                                       <h2 style={{color:"green"}}>All Testcases Passed!</h2>
                                       <h2 style={{color:"green"}}>Solution Accepted!</h2>
                                    </>
                                   )}
                                 </>
                              ) : (
                                 <h2>No submissions.</h2>
                              )}
                           </div>
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

export default Problem