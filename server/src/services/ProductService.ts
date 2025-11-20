import { BaseService } from "./BaseService";
export class ProductService extends BaseService {
  private static instance: ProductService;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async getProducts() {
    const sql = `SELECT * FROM product.products`;
    const products = await this.safeQuery(sql);
    // const result = await this.safeQuery<User>(sql, [id]); (cung duoc)
    // const users = await this.safeQuery(sql, params);
    return products;
  }

  async getTopEndingSoonProducts() {
    const sql = `
    SELECT * 
    FROM product.products
    ORDER BY product.products.end_time ASC
    LIMIT 5
    `;
    const endTimeProducts = await this.safeQuery(sql);
    return endTimeProducts;
  }

  async getTopBiddingProducts() {
  const sql = `
  SELECT * 
  FROM product.products AS products 
  WHERE products.id IN (
  SELECT products.id
  FROM product.products AS products 
  JOIN auction.bid_logs  AS bid_logs ON bid_logs.product_id = products.id 
  GROUP BY products.id 
  ORDER BY COUNT(DISTINCT bid_logs.user_id) DESC
  LIMIT 5
  )
  `;
  const topBiddingProducts = await this.safeQuery(sql);
  return topBiddingProducts;
  }

  async getTopPriceProducts(){
    const sql = `
    SELECT * 
    FROM product.products AS products 
    ORDER BY products.initial_price DESC 
    LIMIT 5
    `
    const topPriceProducts = await this.safeQuery(sql);
    return topPriceProducts;
  }
}
