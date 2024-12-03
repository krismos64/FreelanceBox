```typescript
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import pool from '../config/database';

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  createdAt: z.string().datetime(),
});

export type User = z.infer<typeof userSchema>;

export class UserModel {
  static async create(data: Omit<User, 'id' | 'createdAt'>) {
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const [result] = await pool.query(
      'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
      [id, data.name, data.email, hashedPassword]
    );
    
    return { id, name: data.name, email: data.email };
  }

  static async findByEmail(email: string) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async findById(id: string) {
    const [rows] = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async verifyPassword(user: User, password: string) {
    return bcrypt.compare(password, user.password);
  }
}
```