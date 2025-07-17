export const formatJson = (req, res) => {
  const { rawJson } = req.body;
  try {
    const parsed = JSON.parse(rawJson);
    const formatted = JSON.stringify(parsed, null, 2);
    // Save to DB if needed
    return res.status(200).json({ success: true, formatted });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Invalid JSON' });
  }
};

export const encodeBase64 = (req, res) => {
  const { text } = req.body;
  try {
    const encoded = Buffer.from(text).toString('base64');
    res.status(200).json({ success: true, encoded });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Encoding failed' });
  }
};

export const decodeBase64 = (req, res) => {
  const { base64 } = req.body;
  try {
    const decoded = Buffer.from(base64, 'base64').toString('utf-8');
    res.status(200).json({ success: true, decoded });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Decoding failed' });
  }
};
