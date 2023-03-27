export default {
  "logTable" : (req, res, next) => {
        console.table({
      "ip" : req.ip,
      "method" : req.method,
      "path" : req.path
    })
    next();
  }
}