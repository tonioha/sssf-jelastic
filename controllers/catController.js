'use strict';
// catController

const cat = require('../models/catSchema');

const cat_list_get = async (req, res) => {
  let {gender, age, weight} = req.query;
  let query = {};

  if (gender != null) query.gender = gender;
  if (age != null) query.age = {'$gt': age};
  if (weight != null) query.weight = {'$gt': weight};

  res.json(await cat.find(query));
};

const cat_get = async (req, res) => {
  res.json(await cat.findById(req.params.id));
};

const cat_post = async (req, res) => {
  let errors = [];

  if (!req.body.name) { errors.push("No name given")};
  if (!req.body.age) { errors.push("No age given")};
  if (!req.body.gender) { errors.push("No gender given")};
  if (!req.body.color) { errors.push("No color given")};
  if (!req.body.weight) { errors.push("No weight given")};

  if (errors.length) {
    res.status(400).json({ "error":errors.join(", ")});
    return;
  }

  const mycat = await cat.create({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    color: req.body.color,
    weight: req.body.weight
  });
  res.send(`Cat created with name: ${mycat.name} and id: ${mycat._id}`);
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
};
