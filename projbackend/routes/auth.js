const express = require("express");
const router = express.Router();
const { check, body, validationResult } = require("express-validator");
const { signOut, signUp, signIn, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  check("name")
    .isLength({ min: 2 })
    .withMessage("Name length should be atleast 2"),
  check("email").isEmail().withMessage("Enter a valid Email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password length should be atleast 6"),
  signUp
);

router.post(
  "/signin",
  check("email").isEmail().withMessage("Email is required...!"),
  check("password")
    .isLength({ min: 1 })
    .withMessage("Password is required...!"),
  signIn
);

router.get("/signout", signOut);

// router.get("/testroute", isSignedIn, (req, res) => {
//     res.json(req.auth);
// })

module.exports = router;
