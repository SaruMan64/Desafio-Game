const fs = require("fs");

const writeJSON = (filePath, data, enconding = "utf-8") => {
  const promisseCB = (resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), enconding, (err) => {
      if (err) {
        reject(err);
        return "End Error";
      }
      resolve(filePath + " file was written");
    });
  };
  return new Promise(promisseCB);
};

const readJSON = (filePath, enconding = "utf-8") => {
  const promisseCB = (resolve, reject) => {
    fs.readFile(filePath, enconding, (err, data) => {
      if (err) {
        reject(err);
        return "End Error";
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (e) {
        reject(e);
      }
    });
  };

  return new Promise(promisseCB);
};

const updateJSON = (filePath, newData, enconding = "utf-8") => {
  const promisseCB = async (resolve, reject) => {
    try {
      const data = await readJSON(filePath, enconding);
      const result = { ...data, ...newData };
      await writeJSON(filePath, result);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  };
  return new Promise(promisseCB);
};

const deleteJSON = (filePath) => {
  const promisseCB = async (resolve, reject) => {
    fs.unlink(filePath, (err, result) => {
      if(err){
        reject(err);
        return "End Error";
      }
      resolve(filePath + " file was deleted");
    });
  };
  return new Promise(promisseCB);
};

module.exports = {writeJSON, readJSON, updateJSON, deleteJSON};

//writeJSON('./malakoi.json', {name:"yeté"}).then(console.log).catch(console.error);
//readJSON('./database.json').then(console.log).catch(console.error);
//updateJSON('./malakoi.json', {id:1}).then(console.log).catch(console.error);
//deleteJSON('./malakoi.json').then(console.log).catch(console.error);