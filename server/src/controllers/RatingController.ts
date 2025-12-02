import { Request, Response } from "express";
import { BaseController } from "./BaseController";

export class RatingController extends BaseController {
    constructor(service: any) {
        super(service);
    }

    async getRating(req: Request, res: Response) {
        console.log(req.params, "gap", req.body)
        const { userId, offset } = req.params
        const result = await this.service.getRating({userId, offset});
        return { result };
    }

    async createRating(req: Request, res: Response) {
        const result = await this.service.createRating(req.body);
        return { result };
    }
}