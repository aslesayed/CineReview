const reviewModel = require("../models/reviews.model");

const insertReview = async (req, res) => {
  try {
    const { review, user_id, content_id } = req.body;
    console.log("Received data:", { review, user_id, content_id });

    const review_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const result = await reviewModel.insert({ review, review_date, user_id, content_id });

    if (result && result.affectedRows > 0) {
      console.log("Review inserted with ID:", result.insertId);

      const insertedReview = await reviewModel.findById(result.insertId);
      console.log("Inserted review data:", insertedReview);

      const user = await reviewModel.findUserById(user_id);
      console.log("User data:", user);

      if (insertedReview && insertedReview.length > 0 && user && user.length > 0) {
        const reviewData = {
          ...insertedReview[0],
          firstname: user[0].firstname,
          lastname: user[0].lastname,
          thumbnail: user[0].thumbnail,
        };
        console.log("Review data to be returned:", reviewData);
        res.status(201).json(reviewData);
      } else {
        console.error("Review or user not found");
        res.status(404).json({ error: "Review or user not found" });
      }
    } else {
      console.error("Failed to insert review");
      res.status(500).json({ error: "Failed to insert review" });
    }
  } catch (error) {
    console.error("Error in insertReview:", error);
    res.status(500).json({ error: error.message });
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


