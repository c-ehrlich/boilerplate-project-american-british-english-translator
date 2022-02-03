const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  translate = (text, locale, highlightTranslatedWords) => {
    /**
     * INPUT SANITISING / ERROR HANDLING
     */
    if (!this._validateLocale(locale)) {
      return {
        error: "Invalid value for locale field",
      };
    }

    /**
     * TRANSLATION
     */

    // First character of the input is ALWAYS shifted to uppercase
    // other than that, case is ignored (including for example first char of the second sentence)

    // words get translated no matter what case they're in
    // the output translation is always the default case
    // UNLESS it's the first character of the entire string, then the
    // first letter gets capitalized. so probably do that last.

    // translated words get wrapped in `<span class=\"highlight\">WORD</span>
    const translation = "todo";

    if (translation === text) {
      return {
        text: text,
        translation: "Everything looks good to me!",
      }
    }

    return {
      text: text,
      translation: translation,
    }
  };

  _validateLocale = (locale) => {
    if (locale !== "american-to-british" || "british-to-american") {
      return false;
    }
    return true;
  };
}

module.exports = Translator;
