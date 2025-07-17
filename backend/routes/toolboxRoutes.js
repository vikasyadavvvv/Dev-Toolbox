import express from 'express';
import {
  formatJson,
  encodeBase64,
  decodeBase64,
} from '../controllers/toolboxController.js';

const router = express.Router();

router.post('/format-json', formatJson);
router.post('/encode', encodeBase64);
router.post('/decode', decodeBase64);

export default router;
