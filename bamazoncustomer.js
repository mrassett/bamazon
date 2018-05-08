let mysql = require("mysql");
let inquirer = require("inquirer");
let selected = [];

// create the connection information for the sql database
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Wilson4097",
  database: "bamazon"
});
// ("SELECT * product_name, department_name, price, stock_quantity FROM products", function(error, response)
connection.connect(function(error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId);
    queryProducts()
  });
  function queryProducts() {
    connection.query("SELECT * FROM products", function(error, response) {
      for (var i = 0; i < response.length; i++) {
        console.log(response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity);
      }
      console.log("-----------------------------------");
      selectedProduct()
    });
  }
let selectedProduct  = function(){ 
inquirer
  .prompt([
    {
      name: "Purchase",
      type: "input",
      message: "What would you like to purchase?"
    },
    {
      name: "Howmany",
      type: "input",
      message: "How many would you like?"
      },

  ])
  .then(function(inquirerResponse) {
  //if else statement or switch case goes here
  });
}