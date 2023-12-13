const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const storeController = require("../controllers/storeController");
const bagController = require("../controllers/bagController");
const authenticateUser = require("../middlewares/authenticateUser");

// Rutas de usuarios
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Registra un usuario
 *     responses:
 *       200:
 *         description: Registro de usuario exitoso
 */
router.post("/users/register", userController.registerUser);
/**
 * @swagger
 * /api/users/:idUser:
 *   get:
 *     summary: Ver usuario por id
 *     responses:
 *       200:
 *         description: Ver usuario
 */
router.get("/users/:userId", authenticateUser, userController.getUserById);
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login de usuario
 *     responses:
 *       200:
 *         description: Login exitoso
 */
router.post("/users/login", userController.loginUser);
router.put("/users/:userId/change-password", userController.changePassword);

// Rutas de tiendas
/**
 * @swagger
 * /api/store:
 *   get:
 *     summary: Ver todos los comercios
 *     responses:
 *       200:
 *         description: Listado de comercios
 */
router.get("/stores", storeController.getAllStores);

/**
 * @swagger
 * /api/store/id:
 *   get:
 *     summary: Ver comercio por ID
 *     responses:
 *       200:
 *         description: Comercio por ID
 */
router.get("/stores/:storeId", storeController.getStoreById);
router.post("/stores", authenticateUser, storeController.createStore);
router.put("/stores/:storeId", authenticateUser, storeController.updateStore);
router.delete(
  "/stores/:storeId",
  authenticateUser,
  storeController.deleteStore
);

// Rutas de bolsas
/**
 * @swagger
 * /api/bag:
 *   get:
 *     summary: Ver todas las bolsas
 *     responses:
 *       200:
 *         description: Listado de bolsas
 */
router.get("/bags", bagController.getAllBags);
/**
 * @swagger
 * /api/bag/id:
 *   get:
 *     summary: Ver una bolsa por ID
 *     responses:
 *       200:
 *         description: Ver bolsa por ID
 */
router.get("/bags/:bagId", bagController.getBagById);
router.post("/bags", authenticateUser, bagController.createBag);
router.put("/bags/:bagId", authenticateUser, bagController.updateBag);
router.delete("/bags/:bagId", authenticateUser, bagController.deleteBag);

// Ruta para cerrar sesión
router.post("/users/logout", authenticateUser, userController.logoutUser);
module.exports = router;
