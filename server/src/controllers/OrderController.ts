import { BaseController } from "./BaseController";
import { Request, Response, NextFunction } from "express";

export class OrderController extends BaseController {
  constructor(service: any) {
    console.log("console log đây constructor order controller");
    super(service);
  }

  async getOrder (req: Request, res: Response) {
    console.log("console log đây getOrder");
    return res.send("hi");
    const orders = await this.service.getOrder();
    return res.send({ orders });
  }

  async getOrderById (req: Request, res: Response) {
    console.log("console log đây getOrderById");
    const productId = Number(req.params.productId);

    const order = await this.service.getOrderById(productId);
    return res.send({ order });
  }

  async createOrder (req: Request, res: Response) {
    const result = await this.service.createOrder(req.body);
    return res.send(result);
  }

  async updateOrderStatus (req: Request, res: Response) {
    const productId = Number(req.params.productId);
    const status = req.params.status;

    const result = await this.service.updateOrderStatus(productId, status);
    return res.send(result);
  }

  async getOrderChat (req: Request, res: Response) {
    const productId = Number(req.params.productId);

    const chat = await this.service.getOrder(productId);
    return res.send({ order_chat: chat });
  }

  async createOrderChat (req: Request, res: Response) {
    const productId = Number(req.params.productId);

    const result = await this.service.createOrderChat(productId, req.body);
    return res.send(result);
  }
}