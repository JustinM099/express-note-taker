const express = require('express')
const notes = require('express').Router()
const fs = require('fs')
const db = './db/db.json'
const { v4: uuidv4 } = require('uuid')
const util = require('util')

const readFromFile = util.promisify(fs.readFile)

notes.get('/', (req, res) => {
    console.log(`${req.method} received for notes!}`)

    fs.readFile(db, 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.json(JSON.parse(data))
        }
    })
})

notes.post('/', (req, res) => {
    console.log(`${req.method} received for notes!}`)

    const { title, text } = req.body

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        fs.readFile(db, 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                const parsedData = JSON.parse(data)
                parsedData.push(newNote)
                fs.writeFile(db, JSON.stringify(parsedData, null, 4), (err) =>
                    err ? console.error(err) : console.log(`note written to ${db}`)
                );
            }

        })
    }
})

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteId);

      fs.writeFile(db, JSON.stringify(result, null, 4), (err) =>
    err ? console.error(err) : console.log(`Data written to ${db}`)
  )
      res.json(`Item ${noteId} has been deleted`);
    })
})

module.exports = notes

// const tips = require('express').Router();
// const { v4: uuidv4 } = require('uuid');
// const {
//   readFromFile,
//   readAndAppend,
//   writeToFile,
// } = require('../helpers/fsUtils');

// // GET Route for retrieving all the tips
// tips.get('/', (req, res) => {
//   readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
// });

// // GET Route for a specific tip
// tips.get('/:tip_id', (req, res) => {
//   const tipId = req.params.tip_id;
//   readFromFile('./db/tips.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       const result = json.filter((tip) => tip.tip_id === tipId);
//       return result.length > 0
//         ? res.json(result)
//         : res.json('No tip with that ID');
//     });
// });

// // DELETE Route for a specific tip
// tips.delete('/:tip_id', (req, res) => {
//   const tipId = req.params.tip_id;
//   readFromFile('./db/tips.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       // Make a new array of all tips except the one with the ID provided in the URL
//       const result = json.filter((tip) => tip.tip_id !== tipId);

//       // Save that array to the filesystem
//       writeToFile('./db/tips.json', result);

//       // Respond to the DELETE request
//       res.json(`Item ${tipId} has been deleted 🗑️`);
//     });
// });

// // POST Route for a new UX/UI tip
// tips.post('/', (req, res) => {
//   console.log(req.body);

//   const { username, topic, tip } = req.body;

//   if (req.body) {
//     const newTip = {
//       username,
//       tip,
//       topic,
//       tip_id: uuidv4(),
//     };

//     readAndAppend(newTip, './db/tips.json');
//     res.json(`Tip added successfully 🚀`);
//   } else {
//     res.error('Error in adding tip');
//   }
// });

// module.exports = tips;

// const fs = require('fs');
// const util = require('util');

// // Promise version of fs.readFile
// const readFromFile = util.promisify(fs.readFile);
// /**
//  *  Function to write data to the JSON file given a destination and some content
//  *  @param {string} destination The file you want to write to.
//  *  @param {object} content The content you want to write to the file.
//  *  @returns {void} Nothing
//  */
// const writeToFile = (destination, content) =>
//   fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
//     err ? console.error(err) : console.info(`\nData written to ${destination}`)
//   );
// /**
//  *  Function to read data from a given a file and append some content
//  *  @param {object} content The content you want to append to the file.
//  *  @param {string} file The path to the file you want to save to.
//  *  @returns {void} Nothing
//  */
// const readAndAppend = (content, file) => {
//   fs.readFile(file, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const parsedData = JSON.parse(data);
//       parsedData.push(content);
//       writeToFile(file, parsedData);
//     }
//   });
// };

// module.exports = { readFromFile, writeToFile, readAndAppend };
