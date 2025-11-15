//req.params gives you {a:"5", b:"7"}
//parseInt
//so .params requests parameters from parts of the url that are variables
//REQ = REQUEST
//RES = RESPONSE! WHAT THE SERVER SENDS BACK TO THE CLIENT!
export default function PathParameters(app) {
  const add = (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    //DONT SEND THEM AS INTEGERS SINCE IT CAN BE INTERPRETED AS A STATUS
    res.send(sum.toString());
  };
  const subtract = (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) - parseInt(b);
    res.send(sum.toString());
  };
  {
    /**multiplication function */
  }
  const multiply = (req, res) => {
    const { a, b } = req.params;
    const mult = parseInt(a) * parseInt(b);
    res.send(mult.toString());
  };

  {
    /**division function  */
  }

  const divide = (req, res) => {
    const { a, b } = req.params;
    const division = parseInt(a) / parseInt(b);
    res.send(division.toString());
  };
  //THESE TWO LINES CONNECT YOUR FUNCTIONS TO REAL URLS IN YOUR EXPRESS SERVER
  //when someone makes a GET request to /Lab5/add/:a/"b call the add function" the :a and :b are route parameters
  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", subtract);
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);
}
