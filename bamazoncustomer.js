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
    },
    {
      name: "quantity",
      type: "input",
      message: "How many would you like?"
      },

  ])
  .then(function(inquirerResponse) {
  //if else statement or switch case goes here
  var quantity = parseInt(inquirerResponse.quantity)
  let chosenProduct = parseInt(inquirerResponse.choice);
  console.log(chosenProduct);
  let product = updateInventory(chosenProduct, inventory);
  if (product){
    promptHowMany(product)
  } else  if (quantity > product.stock_quantity) {
    console.log("Sorry, we don't have enough of that product in stock");
    selectedProduct();
  } else {
    updateInventory(product, quantity);
    selectedProduct();
  }
  });
}
function updateInventory(product, quantity){
connection.query(
  "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", 
  [quantity, product.item_id], 
  function(err,res){
    console.log("\n Thank you for your purchase of" + quantity + product.product_name);
    selectedProduct();
  }
)
}