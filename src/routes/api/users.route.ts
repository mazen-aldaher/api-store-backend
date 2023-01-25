import { Router } from "express";
import * as controller from "../../controllers/users.control";
const routes = Router();

routes.route("/").get(controller.getUsers).post(controller.createUser);

routes
  .route("/:id")
  .get(controller.getUserById)
  .patch(controller.updateUser)
  .delete(controller.removeUser);
routes.route("/auth").post(controller.authenticate);
export default routes;
