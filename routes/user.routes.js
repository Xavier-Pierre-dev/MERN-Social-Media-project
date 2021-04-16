const router = require("express").Router();
const authController = require("./../controllers/auth.controller");
const userController = require("./../controllers/user.controller");
const uploadController = require('./../controllers/upload.controller');
const multer = require("multer");
const upload = multer();

//auth 
// appel la fonction signUp présente dans auth.controller.js
// donc quand : requet post "chemin_web_site"/api/user/register
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user display: 'block'
// appel la fonction getAllUsers présent dans user.controller.js
// avec router (app.use('/api/user', userRoutes);)
// donc quand : requet get "chemin_site_web"/api/user/
router.get('/', userController.getAllUsers);

router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id',userController.follow);
router.patch('/unfollow/:id',userController.unfollow);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;