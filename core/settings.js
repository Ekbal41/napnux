module.exports = (req, res, stings) => {
  if (Object.keys(stings).length === 0) return;
  console.log("stings", stings);
};

// module.exports = {
//   processXFF: (req) => {
//     console.log("processXFF");
//     if (this.settings["trustProxyHeaders"]) {
//       const xForwardedFor = req.headers["x-forwarded-for"];
//       if (xForwardedFor) {
//         const clientIp = xForwardedFor.split(",")[0].trim();
//         req.clientIp = clientIp;
//       }
//     }
//   },
// };
