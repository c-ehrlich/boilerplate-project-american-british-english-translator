"use strict";

const { request } = require("chai");
const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  /**
   * expected request body (json):
   * locale: string - either 'american-to-british' or 'british-to-american'
   * text: stirng - anything, not empty
   */
  app.route("/api/translate").post((req, res) => { 
    // make sure the body string is not empty
    if (req.body.text === "") {
      return res.json({ error: "No text to translate" });
    }

    // make sure no required body parameters are missiong
    if (!req.body.text || !req.body.locale) {
      return res.json({ error: "Required field(s) missing" });
    }

    const response = translator.translate(req.body.text, req.body.locale, true);
    return res.json(response);
  });
};
