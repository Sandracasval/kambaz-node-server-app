export default function QueryParameters(app) {
  const calculator = (req, res) => {
    //retrive a,b, and operation parameters from the quert
    const { a, b, operation } = req.query;
    let result = 0;
    //switch is a more organized version of writting multiple if statements
    //case defines a possible match for the switch value, if the value matches, the code under case runs
    //break stops JS from running into the next case
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      // implement multiply and divide on your own
      case "multiply":
        result = parseInt(a) * parseInt(b);
        break;
      //now doing it for divide
      case "divide":
        result = parseInt(a) / parseInt(b);
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  };
  app.get("/lab5/calculator", calculator);
}
