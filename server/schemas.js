const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    uid: String,
    problemsSolved: [{
        name: String,
        difficulty: String,
    }],
    hardSolved: Number,
    easySolved: Number,
    mediumSolved: Number,
    admin: Boolean  
});
const problemSchema = new mongoose.Schema({
    name: String,
    difficulty: String,
    statement: String,
    editorial: String,
    testcases: [{
        input: String,
        expected:String
    }],
    tag: String
});
const totalProblems=new mongoose.Schema({
    easy: Number,
    hard: Number,
    medium:Number
})
const Users=mongoose.model("users", userSchema);
const Problems=mongoose.model('problems', problemSchema);
const TotProbs=mongoose.model("totprobs", totalProblems)
module.exports={Users,Problems,TotProbs}