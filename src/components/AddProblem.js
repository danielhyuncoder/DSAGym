import React, {useState} from 'react'
import '../css/Admin.css'
import ParaScanner from './ParaScanner';
import { useSelector } from 'react-redux';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import compile from '../library/SmoothQuestionSyntax';
const AddProblem = () => {
  const[title, setTitle] = useState("")
  const[difficulty, setDifficulty] = useState("Easy");
  const[description, setDescription] = useState([]);
  const[testcases, setTestcases] = useState([])
  const[editorial, setEditorial] = useState([]);
  const[realEditorial,setRealEditorial] = useState("");
  const[realDescription, setRealDescription] = useState("");
  const[tag,setTag]=useState("General Greedy");
  const navigate=useNavigate();
  const user=useSelector(state=>state.user.user)
  
  return (
    <div className="userContainer">
            <div>
            <div className="col">
                 <div className='displayBlock1 specialWidthBlock1'>
                    <div>
                       <h2 style={{color: "blue"}}>Problem Title: </h2>
                       <input onChange={(e)=>setTitle(e.target.value)}placeholder="Problem Title"/>
                       <h2 style={{color: "purple"}}>Difficulty: </h2>
                       <select onChange={(e)=>setDifficulty(e.target.value)}>
                          <option style={{color:"green"}} value="Easy">Easy</option>
                          <option style={{color:"gold"}} value="Medium">Medium</option>
                          <option style={{color:"red"}} value="Hard">Hard</option>
                       </select>
                       <h2 style={{color: "gold"}}>DSA Tag: </h2>
                       <select onChange={(e)=>setTag(e.target.value)}>
                       <option value="General Greedy">General Greedy</option>
                          <option value="Two Pointers">Two Pointers</option>
                          <option value="Dynamic Programming">Dynamic Programming</option>
                          <option value="Stack">Stack</option>
                          <option value="Sliding Window">Sliding Window</option>
                       </select>
                    </div>
                 </div>
                 <div className='displayBlock2'>
                    <div style={{overflow: "scroll"}}>
                        <div>
                        <h2 style={{color: "green"}}>Problem Description: </h2>
                        <textarea spellCheck="false"  onChange={(e)=>{
                            try { 
                                setDescription(compile(e.target.value))
                                setRealDescription(e.target.value);
                            } catch(err) {
                                setDescription([{type: "mt", color: 'red', bold:true, content: "Syntax error."}]);
                            }
                        }} className="probDescEditor" placeholder="Problem Description (Examples, Constraints, Etc)"></textarea>
                        <h2 style={{color: "blue"}}>Testcases (Max 10.): </h2>
                        <button className="addProblemButton" onClick={()=>{
                            let p1 = prompt("Enter the inputs: ");
                            let p2 = prompt("Enter the expected value: ");
                            if (p1.length>0&&p2.length>0){
                                 setTestcases(tc=>[...tc, {input: p1, expected: p2}])
                            } else {
                                alert("Both prompts needs to have content in them!")
                            }
                        }}>Add Testcase</button>
                        <div style={{overflow: "scroll", width:"100%", height:"40vh"
                        }}>
                           {testcases.map(testcase=>(
                            <div style={{display:'flex', flexDirection: "row", width: "100%", height:"20%", alignItems: "center", justifyContent: "center", borderBottom: "1px solid black"}}>
                                <div style={{width:"90%", height: "90%", display:"flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                    <h2 style={{color: "purple"}}>
                                        {testcase.input}
                                    </h2>
                                    <h2 style={{color: "green"}}>
                                        {testcase.expected}
                                    </h2>
                                    <button className="delBtn" onClick={()=>{
                                        setTestcases(tcases=>tcases.filter(item=>item.input!==testcase.input&&item.input!==testcase.input))
                                    }}>Remove</button>
                                </div>
                            </div>
                           ))}
                        </div>
                        <h2 style={{color: "red"}}>Editorial (Solution):  </h2>
                        <textarea spellCheck="false" onChange={(e)=>{
                            try { 
                                setEditorial(compile(e.target.value))
                                setRealEditorial(e.target.value);
                            } catch(err) {
                                setEditorial([{type: "mt", color: 'red', bold:true, content: "Syntax error."}]);
                            }
                        }} className="probDescEditor" placeholder="Solution (Example code, explanation, time complexity, etc)"></textarea>
                        <br/>
                        <button className="addProblemButton" onClick={()=>{
                            axios.post("/add/problem", {
                                name: title,
                                difficulty:difficulty,
                                statement: realDescription,
                                editorial: realEditorial,
                                testcases: testcases,
                                uid: user.uid,
                                tag:tag
                            }).then(r=>{
                                alert("Problem Created!");
                                navigate('/admin/dashboard');
                            })
                        }}>Create Problem</button>
                        </div>
                    </div>
                 </div>
            </div>
            <div className="col">
                 <div className="displayBlock3">
                    <div style={{overflow: "scroll", height: "auto !important"}}>
                       <div>
                       {title.length>0?<h2 style={{color: (difficulty==='Easy'?"green":difficulty==='Medium'?"gold":difficulty==='Hard'?"red":"")}}>{title} - {difficulty}</h2>:<></>}
                       <br/>
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
                       <br/>
                       {realEditorial.length>0?<h2 style={{color: "red"}}>Editorial (Solution):  </h2>:<></>}
                       {editorial.map(desc=>{
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
            </div>
        </div>
    </div>
  )
}

export default AddProblem