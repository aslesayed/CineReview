const reviewModel = require("../models/reviews.model");

// const insertReview = async (req, res, next) => {
//   try {
//     const reviewData = req.body; 
//     const [result] = await reviewModel.insert(reviewData);

//     if (result.insertId) {
//       const [[newReview]] = await reviewModel.findById(result.insertId);
//       res.status(201).json(newReview);
//     } else {
//       res.sendStatus(422);
//     }
//   } catch (error) {
//     next(error);
//   }
// };


const insertReview = async (req, res, next) => {
  try {
    const reviewData = req.body; 
    const [result] = await reviewModel.insert(reviewData);

    if (result.insertId) {
      res.status(201).json(result); // Return the inserted review data
    } else {
      res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
};


const getAll = async (req, res, next) => {
  try {
    const [review] = await reviewModel.findAll();
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

// const getById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const [[review]] = await reviewModel.findById(id);
//     if (review) {
//       res.status(200).json(review);
//     } else {
//       res.sendStatus(404);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

const getByContentId = async (req, res, next) => {
  try {
    const { contentId } = req.params;
    const [reviews] = await reviewModel.findByContentId(contentId);
    if (reviews.length > 0) {
      res.status(200).json(reviews);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};



const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await reviewModel.deleteById(id);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertReview,
  getAll,
  getByContentId,
  deleteReview,
};


