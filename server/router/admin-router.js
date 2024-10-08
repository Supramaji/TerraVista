const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = express.Router();

// User routes
router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);

router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);

router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateUserById);

router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

// Contact routes
router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);

router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteContactById);

// Service routes
router
  .route("/services")
  .get(authMiddleware, adminMiddleware, adminController.getAllServices);

router
  .route("/services/:id")
  .get(authMiddleware, adminMiddleware, adminController.getServiceById);

router
  .route("/services/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateServiceById);

router
  .route("/services/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteServiceById);

router
.route("/services/add")
.post(authMiddleware, adminMiddleware, adminController.addService);

module.exports = router;