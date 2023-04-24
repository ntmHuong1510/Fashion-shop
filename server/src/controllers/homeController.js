let getHomePage = (req, res) => {
  return res.render("test.ejs");
};

let getAboutPage = (req, res) => {
  return res.send("I am Mina");
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
};
