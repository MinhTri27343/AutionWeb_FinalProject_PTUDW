import { BaseService } from "./BaseService";

export class RatingService extends BaseService {

    private static instance: RatingService;

    private constructor() {
        super();
    }

    static getInstance() {
        if (!RatingService.instance) {
            RatingService.instance = new RatingService();
        }
        return RatingService.instance
    }

    async getRating(payload: {userId: number}) {
        const sql = 
                `
                SELECT sum(rating)
                FROM feedback.user_ratings
                WHERE ratee_id = $1
                `
        const params = [payload.userId]

        return await this.safeQuery(sql, params);
    }

    // async createRating(payload) {

    // }

}