const contentModel = require("../models/contents.model");

// const add = async (req, res, next) => {
//   try {
//     const content = req.body;
//     const [result] = await contentModel.insert(content);
//     if (result.insertId) {
//       const [[newcontent]] = await contentModel.findById(result.insertId);
//       res.status(201).json(newcontent);
//     } else res.sendStatus(422);
//   } catch (error) {
//     next(error);
//   }
// };

const getAllMovies = async (req, res, next) => {
  try {
    const [movies] = await contentModel.findByType("movie");
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

const getAllSeries = async (req, res, next) => {
  try {
    const [series] = await contentModel.findByType("series");
    res.status(200).json(series);
  } catch (error) {
    next(error);
  }
};

const getByGenre = async (req, res, next) => {
  try {
    const { genreId } = req.params;
    const [content] = await contentModel.findByGenre(genreId);
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const [content] = await contentModel.findAll();
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
};

const editContent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [result] = await contentModel.update(req.body, id);
    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const deleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await contentModel.deleteById(id);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

// const getByType = async (req, res, next) => {
//   try {
//     const { type } = req.params;
//     const [content] = await contentModel.findByType(type);
//     res.status(200).json(content);
//   } catch (error) {
//     next(error);
//   }
// };

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [[content]] = await contentModel.findById(id);
    if (content) {
      res.status(200).json(content);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const add = async (req, res) => {
  try {
    const { title, description, type, release_date, actors, rating, genres } =
      req.body;
    const thumbnail = req.file; // Assuming you're using multer for file uploads

    const content = {
      type,
      name: title,
      description,
      releaseDate: release_date,
      rating: parseFloat(rating),
      thumbnail: fs.readFileSync(thumbnail.path),
      actors: actors.split(",").map((name) => {
        const [firstname, lastname] = name.trim().split(" ");
        return { firstname, lastname };
      }),
      genres: genres.split(",").map((name) => name.trim()),
    };

    const contentId = await insert(content);

    res
      .status(201)
      .json({ message: "Content uploaded successfully!", contentId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  add,

  getAll,
  editContent,
  deleteContent,
  //  getByType,
  getById,
  getAllMovies,
  getAllSeries,
  getByGenre,
};
