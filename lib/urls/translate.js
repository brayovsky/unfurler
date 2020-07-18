const { TranslationServiceClient } = require('@google-cloud/translate');
const { fetchHtml } = require('../util/url/fetch');
const respond = require('../util/sendRes');

const projectId = process.env.GCP_PROJECT_ID;
const location = 'global';

const translationClient = new TranslationServiceClient();

module.exports = async function translateText(req, res) {
  const { targetLanguageCode } = req.body;

  if (!targetLanguageCode) {
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
    };

    const [{ languages }] = await translationClient.getSupportedLanguages(request);

    const languageCodes = languages.map((language) => language.languageCode);

    respond(req, res, 400, {
      error:
        "Include 'targetLanguageCode' in request body. 'targetLanguageCode' should be one of " +
        languageCodes.join(', '),
    });
    return;
  }

  const url = req.params.url + req.params[0];

  let page;
  try {
    page = await fetchHtml(url);
  } catch (e) {
    respond(req, res, 412, { error: e.message });
    return;
  }

  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [page],
    mimeType: 'text/html',
    targetLanguageCode,
  };

  try {
    const [response] = await translationClient.translateText(request);

    for (const translation of response.translations) {
      res.set('Content-Type', 'text/html');
      respond(req, res, 200, translation.translatedText);
      break;
    }
  } catch (error) {
    respond(req, res, 503, { error: 'Service unavailable. ' + error.details });
  }
};
