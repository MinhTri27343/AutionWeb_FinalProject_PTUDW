import { BaseRoute } from "./BaseRoute";
import { ProductController } from "../controllers/ProductController";
import { ProductService } from "../services/ProductService";
import { BaseController } from "../controllers/BaseController";
export class ProductRoute extends BaseRoute {
  private productController: ProductController;
  constructor() {
    super();
    this.productController = new ProductController(ProductService.getInstance());
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/",BaseController.handleRequest(this.productController.getProducts.bind(this.productController)));
    this.router.get("/top",BaseController.handleRequest(this.productController.getTopProduct.bind(this.productController)));
  }
}

