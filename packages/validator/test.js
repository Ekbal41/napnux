const validator = require("./lib/validator");

const data = {
  username: "john.doewegtyuioxcghn",
  email: "johnex@ample.com",
  age: 25,
};

const schema = {
  username: ["required", "length:4:20"],
  email: ["required", "email", "alreadyRegistered"],
  age: ["required", "numeric", "positive", "range:18:20"],
};

const v = validator(data);

v.addRule({
  name: "range",
  rule: (value, from, to) => {
    return value >= from && value <= to;
  },
  error: "{field} must be in range of {params[0]} and {params[1]}",
});

const errors = v.validate(schema);
console.log(errors);
