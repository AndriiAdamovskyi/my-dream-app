const express = require("express");
const multer = require("multer");

const checkAuth = require("../middleware/check-auth");

const PostController = require("../controllers/posts");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post(
  "",
  checkAuth, // We will extract image only if we are verified,
  //so check function must be called before any further processing
  multer({ storage: storage }).single("image"),
  PostController.addPost
);

router.put(
  "/:id",
  checkAuth, // We will extract image only if we are verified,
  //so check function must be called before any further processing
  multer({ storage: storage }).single("image"),
  PostController.editPost
);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);

// Check function must be called before any further processing
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
