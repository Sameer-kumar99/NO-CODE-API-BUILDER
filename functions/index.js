const functions = require('firebase-functions');
const admin = require('firebase-admin');
const mockDataGenerator = require('../server/utils/mockDataGenerator');

admin.initializeApp();
const db = admin.firestore();

exports.api = functions.https.onRequest(async (req, res) => {
  const parts = req.path.split('/').filter(Boolean);
  const projectId = parts.shift();
  const subPath = '/' + parts.join('/');
  const method = req.method;

  try {
    const doc = await db.collection('projects').doc(projectId).get();
    const project = doc.data();
    const endpoint = (project.endpoints || []).find(e => e.path === subPath && e.method === method);
    if (!endpoint) return res.status(404).send('Not found');
    const mock = mockDataGenerator(endpoint.schema);
    res.json(mock);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
