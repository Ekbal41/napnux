const { rules, validate, r } = require("./nap.js");
const string = (value) => (typeof value === "string" ? true : false);
const notInDb = (value) => {
  //mimic a async await db call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === "1234") {
        reject(new Error("Already in db"));
      }
      resolve(true);
    }, 2000);
  });
};

const scma = {
  email: rules()
    .apply(r.required)
    .apply(string)
    .done("hola hola"),
  username: rules().apply(string).done("hola hola"),
  password: rules().apply(r.number).done("hola hola"),
};

const data = {
  username: "1234",
  password: 123456,
};
const vresult = validate(scma, data);

console.log(vresult);
