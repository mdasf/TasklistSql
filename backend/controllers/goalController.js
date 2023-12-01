const asyncHandler = require("express-async-handler");

const pool = require("../config/db");

//@desc     Get goals
//@route    GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
  let queryText = "SELECT * FROM tasks";
  pool
    .query(queryText)
    .then((result) => {
      // array of object that gets return in that query
      let payload = {
        data: result[0],
      };
      res.status(200).send(payload);
    })
    .catch((error) => {
      console.log(`error making query ${queryText}`, error);
      res.sendStatus(500);
    });
});

//@desc     Set goal
//@route    POST /api/goals
const setGoal = asyncHandler(async (req, res) => {
  let { title, text: description, completed } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Please add a title field");
  }
  if (!description) {
    res.status(400);
    throw new Error("Please add a description field");
  }

  let queryText =
    "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)";
  pool
    .query(queryText, [title, description, completed])
    .then((result) => {
      if (result[0].affectedRows > 0) res.status(201).send("created");
      else throw Error("Create query not successful");
    })
    .catch((error) => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});

//@desc     Update goal
//@route    PUT /api/goals/:id
const updateGoal = asyncHandler(async (req, res) => {
  let queryText =
    "UPDATE tasks SET completed = CASE WHEN completed = 1 THEN 0 ELSE 1 END WHERE id = ?";
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      if (result[0].affectedRows > 0) res.status(201).send("updated");
      else throw Error(`Task with ID ${req.params.id} not found`);
    })
    .catch((error) => {
      console.log(`Error upadting status`, error);
      res.sendStatus(500);
    });
});

//@desc     Delete goal
//@route    DELETE /api/goals/:id
const deleteGoal = asyncHandler(async (req, res) => {
  const queryText = "DELETE FROM tasks WHERE id = ?";
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      if (result[0].affectedRows > 0) return res.status(201).send("deleted");
      else throw Error(`Task with ID ${req.params.id} not found`);
    })
    .catch((error) => {
      console.log(`Error making query: ${queryText}`, error);
      res.sendStatus(500);
    });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
