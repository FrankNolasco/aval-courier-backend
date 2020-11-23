const { default: Axios } = require("axios");
const mssql = require("mssql");
const database = {};

database.executeQuery = (query, res, next) => {
  let request = new mssql.Request();
  request.query(query, function (err, result) {
    if (err) return next(err);
    const data = result.recordset;
    res.send(data);
  });
};

database.executeQueryWithResponse = (query, res, next, response) => {
  let request = new mssql.Request();
  request.query(query, (err, result) => {
    if (err) return next(err);
    res.send(response);
  });
};

database.executeAxios = async(url) => {
  const response = await Axios.post(url)
  return Array.isArray(response.data) ?  response.data : []
};

module.exports = database;
