const router = require('express').Router()

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts');

router.route('/')
.get(getAllThought)
.post(createThought);

router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/:reactions')
.post(addReaction)
.delete(deleteReaction);

module.exports = router;