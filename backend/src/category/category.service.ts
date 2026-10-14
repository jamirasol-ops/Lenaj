import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class CategoryService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createCategory(category_code: string, category_name: string, users_id: string) {
    const [result] = await this.pool().execute<OkPacket>(
      `INSERT INTO category (category_code, category_name, users_id)
       VALUES (?, ?, ?)`,
      [category_code, category_name, users_id],
    );

    return {
      category_id: result.insertId,
      category_code,
      category_name,
    };
  }

  async findByCategory(category_name: string) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      `SELECT category_id, category_code, category_name
       FROM category
       WHERE category_name = ?`,
      [category_name],
    );

    return rows[0];
  }

  async findById(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      `SELECT category_id, category_code, category_name
       FROM category
       WHERE category_id = ?`,
      [id],
    );

    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      `SELECT category_id, category_code, category_name
       FROM category`,
    );

    return rows;
  }

  async updateCategory(
    id: number,
    partial: {
      category_code?: string;
      category_name?: string;
    },
  ) {
    const fields: string[] = [];
    const values: (string | number)[] = [];

    if (partial.category_code !== undefined) {
      fields.push('category_code = ?');
      values.push(partial.category_code);
    }

    if (partial.category_name !== undefined) {
      fields.push('category_name = ?');
      values.push(partial.category_name);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await this.pool().execute(
      `UPDATE category
       SET ${fields.join(', ')}
       WHERE category_id = ?`,
      values,
    );

    return this.findById(id);
  }

  async deleteCategory(id: number) {
    const [result] = await this.pool().execute<OkPacket>(
      'DELETE FROM category WHERE category_id = ?',
      [id],
    );

    return result.affectedRows > 0;
  }
}
