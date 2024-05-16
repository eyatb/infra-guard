import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT","DELETE"],
        credentials: true
    }
));



app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "devices"
});



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

con.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})
db.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})
app.get("/temp", (req, res) => {
    const sql = "SELECT Temperature,Time from clim";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});
app.get("/hum", (req, res) => {
    const sql = "SELECT Humidity,Time from clim2";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.get('/getEmployee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const newName = req.body.name; 
    const newEmail = req.body.email; 
  
    const sql = 'UPDATE employee SET name = ?, email = ? WHERE id = ?';
    con.query(sql, [newName, newEmail, id], (err, result) => {
      if (err) return res.json({ Error: 'Update employee error in SQL' });
      return res.json({ Status: 'Success' });
    });
  });

  
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employee WHERE id = ?";
    con.query(sql, [id], (err, result) => {
      if (err) return res.json({ Error: "Delete employee error in SQL" });
      return res.json({ Status: "Success" });
    });
  });
  
//users(admins)
   
app.get('/getUsers', (req, res) => {
    const sql = "SELECT * FROM users";
    con.query(sql, (err, result) => {
      if (err) return res.json({ Error: "Get users error in SQL" });
      return res.json({ Status: "Success", Result: result });
    });
  });
  
  app.get('/getadmins/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users WHERE id = ?";
    con.query(sql, [id], (err, result) => {
      if (err) return res.json({ Error: "Get user error in SQL" });
      return res.json({ Status: "Success", Result: result });
    });
  });
  
  app.put('/updateadmins/:id', (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
  
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    con.query(sql, [newName, newEmail, id], (err, result) => {
      if (err) return res.json({ Error: 'Update user error in SQL' });
      return res.json({ Status: 'Success' });
    });
  });
  
  app.delete('/deleteadmin/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM users WHERE id = ?";
    con.query(sql, [id], (err, result) => {
      if (err) return res.json({ Error: "Delete user error in SQL" });
      return res.json({ Status: "Success" });
    });
  });
  app.post('/createadmin', (req, res) => {
    const sql = "INSERT INTO users (`name`,`email`,`password`) VALUES (?)";
    const values = [
      req.body.name,
      req.body.email,
      req.body.password
    ];
  
    con.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error in create admin query:", err);
        return res.json({ Error: "Error in create admin query" });
      }
      console.log("Admin created:", result);
      return res.json({ Status: "Success" });
    });
  });
  
//equipments
app.get('/getdevices', (req, res) => {
    const sql = "SELECT * FROM equipments";
    db.query(sql, (err, result) => {
      if (err) return res.json({ Error: "Get equipments error in SQL" });
      return res.json({ Status: "Success", Result: result });
    });
  });
  
  app.get('/getdevices/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM equipments WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return res.json({ Error: "Get device error in SQL" });
      return res.json({ Status: "Success", Result: result });
    });
  });
  
  app.put('/updatedevice/:id', (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    const newBrand = req.body.brand;
  
    const sql = 'UPDATE equipments SET name = ?, brand = ? WHERE id = ?';
    db.query(sql, [newName, newBrand, id], (err, result) => {
      if (err) return res.json({ Error: 'Update device error in SQL' });
      return res.json({ Status: 'Success' });
    });
  });
  
  app.delete('/deletedevice/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM equipments WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return res.json({ Error: "Delete device error in SQL" });
      return res.json({ Status: "Success" });
    });
  });
  
  app.post('/createdevice', (req, res) => {
    const sql = "INSERT INTO equipments (`name`,`brand`) VALUES (?)";
    const values = [
      req.body.name,
      req.body.brand,
    ];
  
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error in create device query:", err);
        return res.json({ Error: "Error in create device query" });
      }
      console.log("device created:", result);
      return res.json({ Status: "Success" });
    });
  });
  

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "You are no Authenticated"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) return res.json({Error: "Token wrong"});
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        } )
    }
}

app.get('/dashboard',verifyUser, (req, res) => {
    return res.json({Status: "Success", role: req.role, id: req.id})
})

app.get('/adminCount', (req, res) => {
    const sql = "Select count(id) as admin from users";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})
app.get('/employeeCount', (req, res) => {
    const sql = "Select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users Where email = ? AND  password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            const id = result[0].id;
            const user = result[0];
            const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json({Status: "Success",user})
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})

app.post('/employeelogin', (req, res) => {
    const sql = "SELECT * FROM employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response)=> {
                if(err) return res.json({Error: "password error"});
                if(response) {
                    const token = jwt.sign({role: "employee", id: result[0].id}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success", id: result[0].id})
                } else {
                    return res.json({Status: "Error", Error: "Wrong Email or Password"});
                }
                
            })
            
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

app.post('/create',upload.single('image'), (req, res) => {
    const sql = "INSERT INTO employee (`name`,`email`,`password`,`image`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.file.filename
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Inside singup query"});
            return res.json({Status: "Success"});
        })
    } )
})
//alerts
app.get('/alert1', (req, res) => {
  const highTempSql = "SELECT Temperature FROM clim WHERE Temperature > 25";
  const lowTempSql = "SELECT Temperature FROM clim WHERE Temperature < 18";
  
  db.query(highTempSql, (err, highTempResult) => {
    if (err) {
      console.error("Error in running high temperature query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  
    if (highTempResult.length === 0) {
      return res.status(404).json({ error: "No high temperature data found" });
    }
  
    const highTemperatures = highTempResult.map((row) => row.Temperature);
    
    db.query(lowTempSql, (err, lowTempResult) => {
      if (err) {
        console.error("Error in running low temperature query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    
      const lowTemperatures = lowTempResult.map((row) => row.Temperature);
  
      return res.json({ highTemperatures, lowTemperatures });
    });
  });
});

app.get('/alert2', (req, res) => {
  const highHumiditySql = "SELECT Humidity FROM clim2 WHERE Humidity > 60";
  const lowHumiditySql = "SELECT Humidity FROM clim2 WHERE Humidity < 40";

  db.query(highHumiditySql, (err, highHumidityResult) => {
    if (err) {
      console.error("Error in running high humidity query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (highHumidityResult.length === 0) {
      return res.status(404).json({ error: "No high humidity data found" });
    }

    const highHumidities = highHumidityResult.map((row) => row.Humidity);

    db.query(lowHumiditySql, (err, lowHumidityResult) => {
      if (err) {
        console.error("Error in running low humidity query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const lowHumidities = lowHumidityResult.map((row) => row.Humidity);

      return res.json({ highHumidities, lowHumidities });
    });
  });
});

const PORT = process.env.PORT || 8081; // Define the port

// Add code to handle port conflict
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use. Trying another port...`);
        // Increment the port number and try again
        app.listen(PORT + 1, () => {
            console.log(`Server is running on port ${PORT + 1}`);
        });
    } else {
        console.error('Server error:', err);
    }
});
