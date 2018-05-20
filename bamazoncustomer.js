let mysql = require("mysql");
let inquirer = require("inquirer");
require("console.table");


// create the connection information for the sql database
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Wilson4097",
  database: "bamazon"
});

connection.connect(function(error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId);
    queryProducts()
  });


  function queryProducts() {
    connection.query("SELECT * FROM products", function(error, response) {
      if (error) console.log(error);
      for (var i = 0; i < response.length; i++) {
        console.log(response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity);
      }
      selectedProduct(response);
    });
  }
let selectedProduct  = function(inventory){ 
inquirer
  .prompt([
    {
      name: "Purchase",
      type: "input",
      message: "What would you like to purchase?"
    }
  ])
  .then(function(inquirerResponse) {
  let chosenProduct = inquirerResponse.choice;
  let product = checkHowMany(chosenProduct, inventory);
  
  if (product){
    promptHowMany(product) 
  } else {
    console.log("Sorry, we don't have that product in stock");
    selectedProduct();
  }
  });
}

function promptHowMany(product){
inquirer
  .prompt([{
        name: "quantity",
        type: "input",
        message: "How many would you like?"

  }
 ]).then(function(inquirerResponse){
  let quantity = parseInt(inquirerResponse.quantity);
  if (quantity > product.stock_quantity){
    console.log("\n Stock Not Available")
    queryProducts()
  } else {
    updateInventory()
  }


})
function updateInventory(product, quantity){
connection.query(
  "UPDATE products SET stock_quantity = stock_quantity - 1", 
  function(err,res){
    if (err) throw err;
    console.log("\n Thank you for your purchase");
    selectedProduct();
  }
)
}
}
function checkHowMany(chosenProduct, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory.product_name === chosenProduct) {
      return inventory;
    }
  }
  return null;
}

