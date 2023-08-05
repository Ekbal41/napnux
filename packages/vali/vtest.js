const { Validator } = require("./validator");

const data = {
  username: "john.doe",
  email: "johnex@ample.com",
  age: 25,
};

const schema = {
  username: ["required", "length:4:20"],
  email: ["required", "email", "alreadyRegistered"],
  age: ["required", "numeric", "positive"],
};

const validator = new Validator(data);

validator.addRule(
  {
    name: "alreadyRegistered",
    validator: async (value) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value === "johnex@ample.com") {
            reject(new Error("Username is already registered"));
          } else {
            resolve(true);
          }
        }, 2000);
      });
    },
    error: "{field} is already registered",
  }
  // another rule
);

const errors = validator.validate(schema);

if (Object.keys(errors).length === 0) {
  console.log("Validation successful");
} else {
  console.error("Validation failed:", errors);
}
