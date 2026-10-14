import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class TypexService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createTypex(type_code: string, type_name: string) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO typex (type_code, type_name) VALUES (?, ?)',
      [type_code, type_name],
    );
    return { id: result.insertId, type_code, type_name };
  }

  async findByTypex(type_name: string) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT type_id, type_code, type_name FROM typex WHERE type_name = ?',
      [type_name],
    );
    return rows[0];
  }

  async findById(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT type_id, type_code, type_name FROM typex WHERE type_id = ?',
      [id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT type_id, type_code, type_name FROM typex',
    );
    return rows;
  }

  async updateTypex(id: number, partial: { type_code?: string; type_name?: string }) {
    const fields: string[] = [];
    const values: any[] = [];

    if (partial.type_code) {
      fields.push('type_code = ?');
      values.push(partial.type_code);
    }

    if (partial.type_name) {
      fields.push('type_name = ?');
      values.push(partial.type_name);
    }

    if (fields.length === 0) return await this.findById(id);

    values.push(id);

    const sql = `UPDATE typex SET ${fields.join(', ')} WHERE type_id = ?`;
    await this.pool().execute(sql, values);

    return this.findById(id);
  }

  async deleteTypex(id: number) {
    const [result] = await this.pool().execute<OkPacket>(
      'DELETE FROM typex WHERE type_id = ?',
      [id],
    );
    return result.affectedRows > 0;
  }
}