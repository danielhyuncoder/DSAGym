import React, { useEffect, useState } from 'react'
import '../css/Admin.css'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
const AdminDashboard = () => {
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
    <div className="dashContainer">
        <div>
          <button className="addProblemButton" onClick={()=>navigate('/admin/add')}>Add Problem</button>
          <br/>
          <div className="filterRow">
              <input onChange={(e)=>{
                setName(e.target.value)
                setDisplayProblems(getProblems(e.target.value,tag, difficulty));
              }} placeholder='Question Name...'/>
              <select onChange={(e)=>{
                setTag(e.target.value)
                setDisplayProblems(getProblems(name,e.target.value, difficulty));
              }}>
                 <option value="">Any DSA</option>
                 <option value="Two Pointers">Two Pointers</option>
                 <option value="General Greedy">General Greedy</option>
                 <option value="Stack">Stack</option>
                 <option value="Dynamic Programming">Dynamic Programming</option>
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
          <div className="adminProblemArea">
             {displayProblems.map(problem => {
                return (
                  <div onClick={()=>navigate("/admin/edit/"+problem.name.split(" ").join("_"))} className="shadeInEffect" style={{width: "100%", height:"20%", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", borderBottom: "1px solid black", cursor:"pointer"}}>
                    <div style={{width: "90%", height:"90%", display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems: "center"}}>
                    <h2 style={{color: "blue"}}>{problem.name}</h2>
                    <h2 style={{color: "purple"}}>{problem.tag}</h2>
                    <h2 style={{color: problem.difficulty==='Easy'?"green":problem.difficulty==='Medium'?"gold":problem.difficulty==='Hard'?"red":""}}>{problem.difficulty}</h2>
                    </div>
                  </div>
                )
             })}
          </div>
        </div>
    </div>
  )
}

export default AdminDashboard