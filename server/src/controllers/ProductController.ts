import { BaseController } from "./BaseController";
import { Request, Response, NextFunction } from "express";

export class ProductController extends BaseController {
  constructor(service: any) {
    super(service); // inject service
  }



  async getProducts(req: Request, res: Response) {
      const products = await this.service.getProducts();
      return {products: products}
  }

  async getTopProduct(req: Request, res: Response){
     const topEndingSoonProducts = await this.service.getTopEndingSoonProducts();
     const topBiddingProducts = await this.service.getTopBiddingProducts();
     const topPriceProducts = await this.service.getTopPriceProducts();

      return {
        topEndingSoonProducts: topEndingSoonProducts,
        topBiddingProducts: topBiddingProducts,
        topPriceProducts: topPriceProducts
      }
  }
    async postProduct(req: Request, res: Response){
     const topEndingSoonProducts = await this.service.getTopEndingSoonProducts();
     const topBiddingProducts = await this.service.getTopBiddingProducts();
     const topPriceProducts = await this.service.getTopPriceProducts();

      return {
        topEndingSoonProducts: topEndingSoonProducts,
        topBiddingProducts: topBiddingProducts,
        topPriceProducts: topPriceProducts
      }
  }
}


// user/