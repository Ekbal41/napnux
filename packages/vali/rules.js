module.exports = {
  required: (value) => value !== undefined && value !== null && value !== "",
  email: (value) =>
    typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+/.test(value),
  length: (value, minLength, maxLength) => {
    if (typeof value !== "string" && !Array.isArray(value)) {
      return false;
    }
    return (
      (!minLength || value.length >= minLength) &&
      (!maxLength || value.length <= maxLength)
    );
  },
  numeric: (value) => !isNaN(value),
  integer: (value) => Number.isInteger(value),
  positive: (value) => value > 0,
  date: (value) => !isNaN(Date.parse(value)),
  url: (value) =>
    typeof value === "string" &&
    /^(http|https):\/\/[^\s/$.?#].[^\s]*$/.test(value),
  slug: (value) => /^[a-z0-9-]+$/.test(value),
};
