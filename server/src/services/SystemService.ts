import { BaseService } from "./BaseService";

export class SystemService extends BaseService {
  private static instance: SystemService;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!SystemService.instance) {
      SystemService.instance = new SystemService();
    }
    return SystemService.instance;
  }

  async updateProductRenewTime(time: number) {
    const sql = `
                UPDATE public.system_config (bidder_id)
                SET product_renew_time = $1
                `;
    const params = [time];

    return this.safeQuery(sql, params);
  }
}
