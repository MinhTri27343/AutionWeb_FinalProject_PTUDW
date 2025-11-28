import { Request, Response } from "express";
import { BaseController } from "./BaseController";

export class RatingController extends BaseController {
    constructor (service: any) {
        super(service);
    }

    async getRating(req: Request, res: Response) {
        const result = await this.service.getRating(req.body);
        return {result};
    }
}