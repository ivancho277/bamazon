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

function displayAllData() {
    connection.query("SELECT * FROM bamazon_db.products;", function (err, res) {
        if (err) throw err;
        console.table(res);
      //  askCustomerID();
    })
}

function updateDataBase(id, quantity) {
    var query = `UPDATE bamazon_db.products SET stock_quantity = stock_quantity - ${quantity}  WHERE item_id = ${id};`
    connection.query(query, function (err, res) {
        //console.table(res);
        displayAllData();       
    })
}

function getItemByID(id) {
    connection.query("SELECT product_name FROM bamazon_db.products WHERE item_id = " + id, function (err, res) {
        if (err) throw err;
        // console.log(res)
        console.log(`You chose ${res[0].product_name}`);
        return res.product_name;
    })
}

//displayAllData();
//askCustomerID();
function askCustomerID() {
    inquirer.prompt([{
                type: "input",
                name: "id",
                message: "What is the ID of the poduct you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }

        ])
        .then((res) => {
            var id = res.id;
           // console.log(res.id)
            getItemByID(id);
            //   console.log(`You want to buy ${res.product_name}`);
            askCustomerQuanitiy(id);
            //displayAllData();
        })
}

function askCustomerQuanitiy(id) {

    inquirer.prompt([{
        type: "input",
        name: "quantity",
        message: "How many would you like to buy?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }

    }]).then((res) => {
        //log how many you bought
        console.log(`You bought ${res.quantity}`);
        //update the db with new quanitity
        updateDataBase(id, res.quantity)
        setTimeout((() => {
            askToPlayAgain();
        }),300)
    
    })
}

function askToPlayAgain(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "buyAgain",
            message: "Would you like to buy something else?"
        }
    ]).then((res) => {
        if(res.buyAgain){
            runBamazonCustomer()
        }
        else{
            console.log("Thank you for shopping!")
        }
    })

}

function runBamazonCustomer() {

    displayAllData();
    setTimeout((() => {
    askCustomerID();
    }), 300)
  
}
runBamazonCustomer()