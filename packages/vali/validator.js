// validator.js

// Rule-based validation functions
const rules = require("./rules");
const onRuleFailedErrorMessage = require("./errorMessages");
class Validator {
  constructor(data) {
    this.data = data;
    this.errors = {};
    this.errorMessages = {};
  }

  setErrorMessage(rule, message) {
    this.errorMessages[rule] = message;
  }

  generateErrorMessage(key, rule, params, defaultMsg) {
    const errorMessage =
      this.errorMessages[rule] ||
      defaultMsg ||
      onRuleFailedErrorMessage[rule] ||
      `Validation failed for '{key}' with rule '{rule}'`;
    return errorMessage
      .replace("{field}", key)
      .replace("{minLength}", params[0])
      .replace("{maxLength}", params[1]);
  }

  validateField(key, value, fieldRules) {
    for (const ruleInfo of fieldRules) {
      const [rule, ...params] = ruleInfo.split(":");
      if (!rules[rule](value, ...params)) {
        const errorMessage = this.generateErrorMessage(
          key,
          rule,
          params,
          rules[rule].message
        );
        this.errors[key] = errorMessage;
        break;
      }
    }
  }

  validate(schema) {
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const value = this.data[key];
        const fieldRules = schema[key];

        if (fieldRules && Array.isArray(fieldRules)) {
          this.validateField(key, value, fieldRules);
        }
      }
    }

    return this.errors;
  }

  addRule(name, ruleFunction) {
    rules[name] = ruleFunction;
  }
}

module.exports = {
  Validator,
  rules,
};
