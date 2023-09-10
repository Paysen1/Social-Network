const Reaction = require('../models/Reaction')

//create reaction
const createReaction = async (req, res) => {
    try{
        const thoughtId = req.params.thoughtId;
        const {reactionBody, username } = req.body;
        const reaction = new Reaction({reactionBody, username});
        await reaction.save;

        const thought = await Thought.findByIdAndUpdate(thoughtId, {
            $push: { reactions: reaction._id },
          });
      
          if (!thought) {
            res.status(404).json({ message: 'No thought found' });
            return;
          }
      
          res.status(201).json(reaction);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
        }
      };
//delete reaction
const deleteReaction = async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;
      const deletedReaction = await Reaction.findByIdAndRemove(reactionId);
      
      if (!deletedReaction) {
        res.status(404).json({ message: 'No reaction found' });
        return;
      }
      await Thought.findByIdAndUpdate(thoughtId, {
        $pull: { reactions: reactionId },
      });
      res.json(deletedReaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };



module.exports = {
    createReaction,
    deleteReaction,
  };