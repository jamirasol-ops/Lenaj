import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class ProductService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createProduct(
    product_code: string,
    product_name: string,
    category_id: number,
    type_id: number
  ) {
    const [result] = await this.pool().execute<OkPacket>(
      `INSERT INTO product
        (product_code, product_name, category_id, type_id)
       VALUES (?, ?, ?, ?)`,
      [product_code, product_name, category_id, type_id],
    );  

    return {
      product_id: result.insertId,
      product_code,
      product_name,
      category_id,
      type_id
    };
  }

  async findByProduct(product_name: string) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      `SELECT product_id, product_code, product_name, category_id, type_id
       FROM product
       WHERE product_name = ?`,
      [product_name],
    );

    return rows[0];
  }

  async findById(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      `SELECT product_id, product_code, product_name, category_id, type_id
       FROM product
       WHERE product_id = ?`,
      [id],
    );

    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      `SELECT product_id, product_code, product_name, category_id, type_id
       FROM product`,
    );

    return rows;
  }

  async updateProduct(
    id: number,
    partial: {
      product_code?: string;
      product_name?: string;
      category_id?: number;
      type_id?: number;
    },
  ) {
    const fields: string[] = [];
    const values: any[] = [];

    if (partial.product_code !== undefined) {
      fields.push('product_code = ?');
      values.push(partial.product_code);
    }

    if (partial.product_name !== undefined) {
      fields.push('product_name = ?');
      values.push(partial.product_name);
    }

    if (partial.category_id !== undefined) {
      fields.push('category_id = ?');
      values.push(partial.category_id);
    }

    if (partial.type_id !== undefined) {
      fields.push('type_id = ?');
      values.push(partial.type_id);
    }

    if (fields.length === 0) {
      return await this.findById(id);
    }

    values.push(id);

    const sql = `
      UPDATE product
      SET ${fields.join(', ')}
      WHERE product_id = ?
    `;

    await this.pool().execute(sql, values);

    return this.findById(id);
  }

  async deleteProduct(id: number) {
    const [result] = await this.pool().execute<OkPacket>(
      'DELETE FROM product WHERE product_id = ?',
      [id],
    );

    return result.affectedRows > 0;
  }
}