const router = require("express").Router();
const { getTexts } = require("../lib/mongodb/textlist");

router.get("/",async (req, res) => {
  const result = await getTexts();
  res.render("./index.ejs", { data: result[0].textList });
});

module.exports = router;