import React, { useEffect, useState } from 'react'
import '../css/Problem.css'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
const Problems = () => {
  const navigate=useNavigate();
    const [problems,setProblems]=useState([])
    const[displayProblems, setDisplayProblems] = useState([])
    const[name, setName]=useState("")
    const[tag, setTag]=useState("");
    const[difficulty,setDifficulty]=useState("");
    const getProblems=(n, t, d)=>{
      let copy = problems;
      if (n.length>0){
         copy=copy.filter(item=>item.name.toLowerCase().indexOf(n.toLowerCase())!==-1);
      }
      if (d.length>0){
        copy=copy.filter(item=>item.difficulty===d);
     }
     if (t.length>0){
      copy=copy.filter(item=>item.tag===t);
   }
     return copy;
  }
  useEffect(() => {
       axios.get('/problems').then(res=>{
          setProblems(res.data);
          setDisplayProblems(res.data);
       })
  }, []);
  return (
    <div className="problemsContainer">
          <div>
           <div className="filterRow">
              <input onChange={(e)=>{
                setName(e.target.value)
                setDisplayProblems(getProblems(e.target.value,tag, difficulty));
              }} placeholder='Question Name...' spellCheck="false"/>
              <select onChange={(e)=>{
                setTag(e.target.value)
                setDisplayProblems(getProblems(name,e.target.value, difficulty));
              }}>
                 <option value="">Any DSA</option>
                 <option value="Two Pointers">Two Pointers</option>
                 <option value="General Greedy">General Greedy</option>
                 <option value="Stack">Stack</option>
                 <option value="Dynamic Programming">Dynamic Programming</option>
                 <option value="Sliding Window">Sliding Window</option>
              </select>
              <select onChange={(e)=>{
                setDifficulty(e.target.value)
                setDisplayProblems(getProblems(name,tag, e.target.value));
              }}>
                 <option value="">Any Difficulty</option>
                 <option value="Easy" style={{color:"green"}}>Easy</option>
                 <option value="Medium" style={{color:"gold"}}>Medium</option>
                 <option value="Hard" style={{color:"red"}}>Hard</option>
              </select>
           </div>
           <div className="mR problemItemWrapper">
                  <p style={{color:'blue'}}>Name: </p>
                  <p style={{color:'purple'}}>Difficulty: </p>
                  <p style={{color:'red'}}>DSA Tag: </p>
            </div>
     

               {displayProblems.length>0?<>
               <div className="problemsDisplay">
               {displayProblems.map(problem=>(
                <div className="problemItemWrapper" onClick={()=>navigate("/problem/"+problem.name.split(" ").join("_"))}>
                  <p>{problem.name}</p>
                  <p style={{color: problem.difficulty==='Hard'?"red":problem.difficulty==='Medium'?"gold":"green"}}>{problem.difficulty}</p>
                  <p>{problem.tag}</p>
                </div>
               ))}</div></> : (<b>You need to be logged in order to view problems.</b>)}
        
          </div>
    </div>
  )
}

export default Problems
