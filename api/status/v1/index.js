const router = require("express").Router()
router.get("/status", (req, res) => {
    res.status(200).send("Ok")
});

module.exports = router;