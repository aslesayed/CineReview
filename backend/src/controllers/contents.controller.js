const contentModel = require("../models/contents.model");

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
    const contentList = await contentModel.filterByGenre(genreId);
    res.status(200).json(contentList);
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
const filterContent = async (req, res, next) => {
  try {
    const { type, genre } = req.query;
    const filteredContents = await contentModel.filter(type, genre);
    res.status(200).json(filteredContents);
  } catch (error) {
    next(error);
  }
};

const updateContent = async (req, res, next) => {
  try {
    const data = req.body;
    const contentId = req.params.id;

    const [getContent] = await contentModel.findById(contentId);
    if (!getContent) {
      return res.status(404).json({ message: "Content not found" });
    }

    if (req.files && req.files[0]) {
      data.thumbnail = req.files[0].buffer;
    }

    await contentModel.update(contentId, data);

    const tabActorIds = JSON.parse(data.tabActors);
    const tabGenreIds = JSON.parse(data.tabGenres);

    // Remove existing actors and genres
    await contentModel.removeActors(contentId);
    await contentModel.removeGenres(contentId);

    // Add new actors and genres
    for (let i = 0; i < tabActorIds.length; i += 1) {
      const actorId = tabActorIds[i].value;
      await contentModel.addActorContent(contentId, actorId);
    }

    for (let i = 0; i < tabGenreIds.length; i += 1) {
      const genreId = tabGenreIds[i].value;
      await contentModel.addGenreContent(contentId, genreId);
    }

    const [[updatedContent]] = await contentModel.findById(contentId);

    const actors = await contentModel.getActors(contentId);
    const genres = await contentModel.getGenres(contentId);

    res.status(200).json({ content: updatedContent, actors, genres });
  } catch (error) {
    next(error);
  }
};

// const getById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const [[content]] = await contentModel.findById(id);
//     if (content) {
//       res.status(200).json(content);
//     } else {
//       res.sendStatus(404);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// const add = async (req, res) => {
//   try {
//     const { title, description, type, release_date, actors, rating, genres } =
//       req.body;
//     const thumbnail = req.file; // Assuming you're using multer for file uploads

//     const content = {
//       type,
//       name: title,
//       description,
//       releaseDate: release_date,
//       rating: parseFloat(rating),
//       thumbnail: fs.readFileSync(thumbnail.path),
//       actors: actors.split(",").map((name) => {
//         const [firstname, lastname] = name.trim().split(" ");
//         return { firstname, lastname };
//       }),
//       genres: genres.split(",").map((name) => name.trim()),
//     };

//     const contentId = await insert(content);

//     res
//       .status(201)
//       .json({ message: "Content uploaded successfully!", contentId });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const addContent = async (req, res, next) => {
//   try {
//     const data = req.body;
//     data.thumbnail = req.files[0].buffer;

//     const [contentAdd] = await contentModel.insert(data);
//     const [[getContent]] = await contentModel.findById(contentAdd.insertId);

//     const tabActorIds = JSON.parse(data.tabActors);
//     const tabGenreIds = JSON.parse(data.tabGenres);

//     for (let i = 0; i < tabActorIds.length; i += 1) {
//       const actorId = tabActorIds[i].value;
//       await contentModel.addActorContent(contentAdd.insertId, actorId);
//     }

//     for (let i = 0; i < tabGenreIds.length; i += 1) {
//       const genreId = tabGenreIds[i].value;
//       await contentModel.addGenreContent(contentAdd.insertId, genreId);
//     }

//     res.status(200).json({ content: getContent });
//   } catch (error) {
//     next(error);
//   }
// };

const addContent = async (req, res, next) => {
  try {
    const data = req.body;
    data.thumbnail = req.files[0].buffer;

    const [contentAdd] = await contentModel.insert(data);
    const [[getContent]] = await contentModel.findById(contentAdd.insertId);

    const tabActorIds = JSON.parse(data.tabActors);
    const tabGenreIds = JSON.parse(data.tabGenres);

    const actors = [];
    for (let i = 0; i < tabActorIds.length; i += 1) {
      const actorId = tabActorIds[i].value;
      await contentModel.addActorContent(contentAdd.insertId, actorId);
      const [[actor]] = await contentModel.findByActorId(actorId);
      actors.push(actor);
    }

    const genres = [];
    for (let i = 0; i < tabGenreIds.length; i += 1) {
      const genreId = tabGenreIds[i].value;
      await contentModel.addGenreContent(contentAdd.insertId, genreId);
      const [[genre]] = await contentModel.findByGenreId(genreId);
      genres.push(genre);
    }

    res.status(200).json({ content: getContent, actors, genres });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // add,
  addContent,
  getAll,
  editContent,
  deleteContent,
  // getById,
  getAllMovies,
  getAllSeries,
  getByGenre,
  updateContent,
  filterContent,
};
