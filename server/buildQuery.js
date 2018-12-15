// function tbSyn(request, response, next) {
//   let oneStr = "";

//   res.locals.tables.forEach(objEle => {
//     let tableName = objEle.tableName;
//     let tableArr = Object.values(objEle.table);
//     let head = `CREATE TABLE ${tableName} (`;
//     let body = "";
//     let tail = ");";
//     tableArr.forEach((val, i, arr) => {
//       i === arr.length - 1 ? (body += `${val}`) : (body += `${val},`);
//     });

//     oneStr += head + body + tail;
//   });

//   res.locals.query = oneStr;
//   next();
// }


const obj = {
  tbSyn: (request, response, next) => {
    let oneStr = "";
  
    res.locals.tables.forEach(objEle => {
      let tableName = objEle.tableName;
      let tableArr = Object.values(objEle.table);
      let head = `CREATE TABLE ${tableName} (`;
      let body = "";
      let tail = ");";
      tableArr.forEach((val, i, arr) => {
        i === arr.length - 1 ? (body += `${val}`) : (body += `${val},`);
      });
  
      oneStr += head + body + tail;
    });
  
    res.locals.query = oneStr;
    next();
  }
}

module.exports = obj
