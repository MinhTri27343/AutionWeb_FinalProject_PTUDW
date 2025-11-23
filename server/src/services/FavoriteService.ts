import { ProductPreview } from "../../../shared/src/types";
import { BaseService } from "./BaseService";

type MutationResult = {
  success: boolean
}

export class FavoriteService extends BaseService {
  private static instance: FavoriteService;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!FavoriteService.instance) {
      FavoriteService.instance = new FavoriteService();
    }

    return FavoriteService.instance;
  }

  async getFavorite(): Promise<ProductPreview[]> {
    const sql = `
      SELECT 
        P.*,
        BID.NAME AS TOP_BIDDER_NAME,
        COUNT(LOG.ID) AS BID_COUNT,
        (
          SELECT L.PRICE
          FROM BID_LOGS L
          WHERE L.PRODUCT_ID = P.ID
          ORDER BY L.CREATED_AT DESC
          LIMIT 1
        ) AS CURRENT_PRICE
      FROM FAVORITE_PRODUCTS FP
      JOIN PRODUCTS P ON P.ID = FP.PRODUCT_ID 
      LEFT JOIN USERS BID ON BID.ID = P.TOP_BIDDER_ID
      LEFT JOIN BID_LOGS LOG ON LOG.PRODUCT_ID = P.ID
      WHERE FP.USER_ID = 1
      GROUP BY 
        P.ID, P.SLUG, P.CATEGORY_ID, P.MAIN_IMAGE, P.NAME,
        P.BUY_NOW_PRICE, P.END_TIME, P.AUTO_EXTEND, P.CREATED_AT,
        BID.NAME;
    `;

    const favoriteProducts = await this.safeQuery<ProductPreview>(sql);

    return favoriteProducts;
  }

  async addFavorite(productId: number): Promise<MutationResult> {
    const sql = `
      INSERT INTO FAVORITE_PRODUCTS (PRODUCT_ID, USER_ID, CREATED_AT, UPDATED_AT)
      VALUES ($1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `

    await this.safeQuery(sql, [productId]);
    return {
      success: true
    }
  }

  async removeFavorite(productId: number): Promise<MutationResult> {
    const sql = `
      DELETE FROM FAVORITE_PRODUCTS
      WHERE PRODUCT_ID = $1 AND USER_ID = 1
    `

    await this.safeQuery(sql, [productId]);
    return {
      success: true
    };
  }
}