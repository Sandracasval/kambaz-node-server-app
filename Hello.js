//the app instance  is used to configure the server on what to do when various types of 
//requesta are recieved
//CREATE A ROUTE THAT RESPONDS TO HELLO 
//when the broswer requests /hello express matches it and runs the function
//creating another endpoint mapped to the root of the application


//INSTEAD OF CREATING A NEW EXPRESS INSTANCE, PASS APP AS A PARAMETER IN A FUNCTION 
//WE CAN IMPORT AND INVOKE FROM INDEX.JS
//function accepts app reference to express module 


//THIS UPDATED SYNTAX DECLARES THE CALLBACK FUNCTIONS ON THEIR OWN AND THEN 
//REFERENCES THEM BACK IN THE ROUTE DECLARATIONS AS SHOWN BELOW 
export default function Hello(app) {
  const sayHello = (req, res) => {
    res.send("Life is good!");
  };
  const sayWelcome = (req, res) => {
    res.send("Welcome to Full Stack Development!");
  };
  app.get("/hello", sayHello);
  app.get("/", sayWelcome);
}
