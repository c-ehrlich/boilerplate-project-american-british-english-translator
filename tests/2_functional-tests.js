const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

const Translator = require("../components/translator.js");
const translator = new Translator();

suite("Functional Tests", () => {
  test("Translation with text and locale fields: POST request to `/api/translate`", () => {
    assert.fail();
  });

  test("Translation with text and invalid locale field: POST request to `/api/translate`", () => {
    assert.fail();
  });

  test("Translation with missing text field: POST request to `/api/translate`", () => {
    assert.fail();
  });

  test("Translation with missing locale field: POST request to `/api/translate`", () => {
    assert.fail();
  });

  test("Translation with empty text: POST request to `/api/translate`", () => {
    assert.fail();
  });

  test("Translation with text that needs no translation: POST request to `/api/translate`", () => {
    assert.fail();
  });
});
