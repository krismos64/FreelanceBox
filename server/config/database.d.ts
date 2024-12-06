declare module "config/database" {
  import { Pool } from "mysql2/promise";
  const pool: Pool;
  export default pool;
}
