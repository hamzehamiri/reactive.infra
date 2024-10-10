import LanguageModel from "./LanguageModel.js";

let iran = new LanguageModel();
iran.applyData({
    localeName: 'fa_IR',
    language: 'Iran',
    rtl: true
});
let us = new LanguageModel();
us.applyData({
    localeName: 'en_US',
    language: 'English',
    rtl: false
})

export const Language = {
    Language_US: us,
    Language_IR: iran
};