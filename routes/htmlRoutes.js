const path = require('path');
const router = require('express').Router();

router.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
    console.info(`${req.method} has been received!`);
})

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
    console.info(`${req.method} has been received!`);
})

module.exports = router;