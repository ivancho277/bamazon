var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazon_db"
  });


  function displayAllData(){
      connection.query("SELECT * FROM bamazon_db.products;", function(err, res) {
          if(err) throw err;
          console.table(res);
          askCustomerID();
      })
  }

//displayAllData()
  function getItemByID(id){
      connection.query("SELECT product_name FROM bamazon_db.products WHERE item_id = " + id, function(err, res) {
          if(err) throw err;
          console.log(res)
          console.log(`You chose ${res[0].product_name}`);
          return res.product_name;
      })
  }

  //displayAllData();
  //askCustomerID();
  function askCustomerID() {
      
      inquirer.prompt([
          {
              type: "input",
              name: "id",
              message: "What is the ID of the poduct you would like to buy?",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
          }
        
      ])
      .then((res) => {
          var id = res.id;
          console.log(res.id)
          getItemByID(id);
        //   console.log(`You want to buy ${res.product_name}`);
         askCustomerQuanitiy(id);

      })
  }

  function askCustomerQuanitiy(quantity){

      inquirer.prompt([
          {
          type: "input",
          name: "quantity",
          message: "How many would you like to buy?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }

          }
      ]).then((res) => {
          //log how many you bought
          //update the db with new quanitity
      })
  }

  function runBamazonCustomer(){
    displayAllData();
    

  }
  runBamazonCustomer()