let db;

const request = indexedDB.open("pizza_hunt", 1);

// listener that will run when version changes or first connection is made
request.onupgradeneeded = function (e) {
  // save reference to db
  const db = e.target.result;

  // create an object store (table) called 'new_pizza', set it to have auto increment
  db.createObjectStore("new_pizza", { autoIncrement: true });
};

request.onsuccess = function (e) {
  // when db is successfully created with object store or establishing connection, save reference to db in global
  db = e.target.result;

  // check if app is online, if yes run uploadPizza() function to send all local db data to api
  if (navigator.onLine) {
    uploadPizza();
  }
};

request.onerror = function (e) {
  // log error here
  console.log(e.target.errorCode);
};

function saveRecord(record) {
  // open new transaction with database with read/write permissions
  const transaction = db.transaction(["new_pizza"], "readwrite");

  // access the object store for 'new_pizza'
  const pizzaObjectStore = transaction.objectStore("new_pizza");

  // add record to store with add method
  pizzaObjectStore.add(record);
}

/*
  Opens transaction
  Accesses object store
  Gets all items
  Sets up function for fetch if connection to db was successful
  Checks if results greater than 0
  Runs fetch request to get all data
  Turns response to json then checks for errors
  Opens one last transaction to clear data
*/

function uploadPizza() {
  // open transaction to db
  const transaction = db.transaction(["new_pizza"], "readwrite");

  //access object store
  const pizzaObjectStore = transaction.objectStore("new_pizza");

  // get all record from store and set to a variable
  const getAll = pizzaObjectStore.getAll();

  getAll.onsuccess = function () {
    // if there was data in indexedDb's store, let's send it to the api server
    if (getAll.result.length > 0) {
      fetch("/api/pizzas", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((serverResponse) => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }

          // open another transaction
          const transaction = db.transaction(["new_pizza"], "readwrite");
          //access new object store
          const pizzaObjectStore = transaction.objectStore("new_pizza");
          // clear items in store
          pizzaObjectStore.clear();
          alert("All saved pizza has been submitted");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}

window.addEventListener("online", uploadPizza);
