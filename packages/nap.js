const rules = () => {
  let arules = [];
  function apply(rule) {
    arules.push(rule);
    return this;
  }
  function done(msg) {
    return {
      rules: arules,
      message: msg,
    };
  }
  return {
    apply,
    done,
  };
};

function validate(schema, data) {
  let errors = {};

  for (const key in schema) {
    if (schema.hasOwnProperty(key)) {
      const { rules, message } = schema[key];
      const value = data[key];
      if (value !== void 0) {
        let errmsg = message;
        let result;

        for (const rule of rules) {
          try {
            result = rule(value);
            // console.log(key, result);
          } catch (err) {
            result = false;
            errmsg = err.message;
          }

          if (!result) {
            errors[key] = errmsg || "error";
          }
        }
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }
  return false;
}

const r = {
  string: (value) => {
    if (typeof value === "string") {
      return true;
    }
    throw new Error("must be a string");
  },
  number: (value) => {
    if (typeof value === "number") {
      return true;
    }
    throw new Error("must be a number");
  },
  required: (value) => {
    if (value !== void 0) {
      return true;
    }
    throw new Error("is required");
  },
};

module.exports = {
  rules,
  validate,
  r,
};
