import { query } from "../utils/db";

type Methods = 'POST' | 'GET' | 'PUT' | 'DELETE';

// Generic response type for creation
interface CreatedResponse {
  message: string;
  id: number;
}

// DB result types
interface InsertResult {
  insertId: number;
}

interface AffectedResult {
  affectedRows: number;
}

// Main generic function
export default async function modeller<T extends { id: number }>(
  method: Methods,
  sql: string,
  payload?: T
) {
  switch (method) {
    case 'POST':
      return await post(sql, payload as T);
    case 'GET':
      return await get<T>(sql);
    case 'PUT':
      return await put<T>(sql, payload as T);
    case 'DELETE':
      return await del(sql);
    default:
      throw new Error("Invalid method");
  }
}

// CREATE / INSERT
async function post<T extends { id: number }>(sql: string, payload: T) {
  // Tell TS we expect insertId
  const result = await query(sql, Object.values(payload)) as InsertResult;
  return {
    message: "Created successfully",
    id: result.insertId,
  } as CreatedResponse;
}

// READ / SELECT
async function get<T>(sql: string) {
  const rows = await query(sql);
  return rows as T[];
}

// UPDATE / PUT
async function put<T extends { id: number }>(sql: string, payload: T) {
  const values = Object.values(payload);
  const result = await query(sql, values) as AffectedResult;
  return {
    message: `Updated entity with id ${payload.id}, affected ${result.affectedRows} row(s)`,
  };
}

// DELETE
async function del(sql: string) {
  const result = await query(sql) as AffectedResult;
  return {
    message: `Deleted successfully, affected ${result.affectedRows} row(s)`,
  };
}