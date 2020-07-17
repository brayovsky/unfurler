const testContentType = (acceptableContent, retreivedContent) => {
  if (acceptableContent instanceof RegExp) {
    return acceptableContent.test(retreivedContent);
  } else {
    return acceptableContent === retreivedContent;
  }
};

module.exports = {
  testContentType,
};
