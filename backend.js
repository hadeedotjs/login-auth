const ex = require("express")
const jwt = require("jsonwebtoken")
const jwtPassword = "990675"

const app = ex()
app.use(ex.json())

let users = [{ username: "hadi@gmail.com", password: 123, name: "hadi" },
{ username: "azam@gmail.com", password: 321, name: "azam" }]


function userExist(username, password) {
    let userexists = false
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            userexists = true
        }
    }
    return userexists
}

app.post("/signin", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (!userExist(username, password)) {
        res.status(403).json({ msg: "username or password incorrect" })
    }else{
        let token = jwt.sign({ username: username }, jwtPassword)
        return res.json({
            token
        })
    }
})

app.get("/users", (req,res)=>{
    const recToken = req.headers.authorization
    // try{
        const verify = jwt.verify(recToken, jwtPassword)
        const username = verify.username
        
            res.json({users: users.filter((value)=>{
                if(value.username== username ){
                    return false
                } else {
                    return true 
                }
            })})
        
    // }catch(err){
        // res.status(403).json({
        //     msg : "session expired"
        // })
// }
})



app.listen(3000)