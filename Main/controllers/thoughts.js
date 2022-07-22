const { User, Thought, Reaction } = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
            .populate([
                { path: 'reactions', select: '-__v' },
            ])
            .select('-__v')
            .then(response => res.json(response))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate([
                { path: 'reactions', select: '-__v' },
            ])
            .select('-__v')
            .then(response => {
                if (!response) {
                    res.status(404).json({ message: 'No thought found with this ID.' });
                    return;
                }
                res.json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createThought({ body }, res) {
        Thought.create(body)
            .then(response => {
                User.findByIdAndUpdate({ _id: body.userId }, { $pull: { thoughts: response._id } }, { new: true })
                    .then(response_user => {
                        if (!response_user) {
                            res.status(404).json({ message: 'No User found with this ID' });
                            return;
                        }
                        res.json(response_user);
                    })
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));

    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .select('-__v')
            .then(response => {
                if (!response) {
                    res.status(404).json({ message: 'No thought found with this ID' });
                    return;
                }
                res.json(response);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(response => {
                if (!response) {
                    res.status(404).json({ message: 'No thought found with this ID' });
                    return;
                }
                User.findOneAndUpdate(
                    { username: response.username },
                    { $pull: { thoughts: params.id } }
                )
                    .then(() => {
                        res.json({ message: 'Successfully deleted the thought' });
                    })
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(400).json(err));
    },
    addReaction({ params, body}, res) {
        Thought.findByIdAndUpdate({ _id: params.thoughtId }, { $addToSet: { reactions: body } }, { new: true })
        .then(response => {
            if(!response) {
                res.status(404).json({ message: 'No thought found with that ID!' });
                return;
            }
            res.json(response)
        })
        .catch(err => res.status(400).json(err));
    },
    deleteReaction({ params }, res) {
        Thought.findByIdAndUpdate( params.thoughtId , { $pull: { reactions: { reactionId: params.reactions } } }, { new: true })
        .then(response => {
            if(!response) {
                res.status(404).json({ message: 'No reaction found with this Id!' });
                return;
            }
            res.json(response);
        })
        .catch(err => res.status(400).json(err));
    }

};


module.exports = thoughtController;