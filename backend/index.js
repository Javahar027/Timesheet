const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  // port:'3306',
  user: "root",
  password: "password",
  database: "timesheet",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/userLogin", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  const sqlLogin = "SELECT * FROM user WHERE gedid = ? and password = ?";
  db.query(sqlLogin, [id, password], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      res.send(result);
    }
    else {
      res.send({message:"Invalid ID or Password"})
    }

    
  });
});

app.get("/api/user/read", (req, res) => {
  const { condition1, condition2, condition3 } = req.query;

  const sqlLogin =
    "SELECT * FROM timesheet WHERE mondaydate = ? AND  fridaydate = ? AND  managerid = ?";
  db.query(sqlLogin, [condition2, condition3, condition1], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result) {
      res.send(result);
    }
  });
});

app.get("/api/userCheck/read", (req, res) => {
  const { condition1, condition2, condition3 } = req.query;

  const sqlLogin =
    "SELECT * FROM timesheet WHERE mondaydate = ? AND  gedid = ? AND  managerid = ?";
  db.query(sqlLogin, [condition2, condition3, condition1], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result) {
      res.send(result);
    }
  });
});

app.post("/api/userWeekdata", (req, res) => {
    const gedid =req.body.gedid;
    const name = req.body.name;
    const managerid = req.body.managerid;
    const managername = req.body.managername;
    const team = req.body.team;
    const mondaydate = req.body.mondaydate;
    const tuesdaydate = req.body.tuesdaydate;
    const wednesdaydate = req.body.wednesdaydate;
    const thursdaydate = req.body.thursdaydate;
    const fridaydate = req.body.fridaydate;
    const mondaywork = req.body.mondaywork;
    const tuesdaywork = req.body.tuesdaywork;
    const wednesdaywork = req.body.wednesdaywork;
    const thursdaywork = req.body.thursdaywork;
    const fridaywork = req.body.fridaywork



    

    const sqlLogin = "INSERT INTO timesheet (gedid, name, managerid, managername, team, mondaydate, mondaywork, tuesdaydate, tuesdaywork, wednesdaydate, wednesdaywork, thursdaydate, thursdaywork, fridaydate, fridaywork) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    db.query(sqlLogin, [gedid, name, managerid, managername,team,mondaydate,mondaywork,tuesdaydate,tuesdaywork,wednesdaydate,wednesdaywork,thursdaydate,thursdaywork,fridaydate,fridaywork], (err, result) => {
        if (err){
            console.log(err);
        }

        if(result){
            res.send(result);
        }
        
    });

})


app.put("/api/update", (req, res) => {
  const id = req.body.id;
  const mondaywork = req.body.mondaywork;
  const tuesdaywork = req.body.tuesdaywork;
  const wednesdaywork = req.body.wednesdaywork;
  const thursdaywork = req.body.thursdaywork;
  const fridaywork = req.body.fridaywork;



  const sqlUpdate = "UPDATE timesheet SET mondaywork = ?,tuesdaywork = ?,wednesdaywork = ?,thursdaywork = ?,fridaywork = ? WHERE  id= ?"
  db.query(sqlUpdate, [mondaywork,tuesdaywork,wednesdaywork,thursdaywork,fridaywork,id], (err, result) => {
      if (err) {
          console.log(err);
      }
      else {
      
          res.send(result);
      }
  });

})

app.listen(3001, () => {
  console.log("running on port 3001");
});
