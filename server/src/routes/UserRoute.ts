import { BaseRoute } from "./BaseRoute";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { BaseController } from "../controllers/BaseController";
import multer from "multer";
import { protectedRoutes } from "../middlewares/authMiddleware";
import { authMe } from "../controllers/AuthController";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export class UserRoute extends BaseRoute {
  private controller: UserController;
  constructor() {
    super();
    this.controller = new UserController(UserService.getInstance());
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(
      "/",
      protectedRoutes,
      BaseController.handleRequest(
        this.controller.getUsers.bind(this.controller)
      )
    );
    this.router.get(
      "/me",
      protectedRoutes,
      authMe
    )
    this.router.get(
      "/profile",
      BaseController.handleRequest(
        this.controller.getProfile.bind(this.controller)
      )
    );
    this.router.patch(
      "/profile",
      upload.single("profile_img"),
      BaseController.handleRequest(
        this.controller.updateProfile.bind(this.controller)
      )
    );
  }
}
