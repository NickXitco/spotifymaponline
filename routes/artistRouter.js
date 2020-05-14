const express = require('express');
const router = express.Router();

const ArtistFinder = require('../backend/ArtistFinder');

router.get('/:id', (req, res) => {
    ArtistFinder.findArtist(req.params.id).then(response => {
        res.send(response);
    });
})

module.exports = router;