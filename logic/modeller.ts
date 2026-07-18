import { query } from "../utils/db";

type Methods = "POST" | "GET" | "PUT" | "DELETE";

interface CreatedResponse {
  message: string;
  id: number;
}

interface InsertResult {
  insertId: number;
}

interface AffectedResult {
  affectedRows: number;
}

export default async function modeller<T extends { id: number }>(
  method: Methods,
  sql: string,
  payload?: T
) {
  switch (method) {
    case "POST":
      return post(sql, payload as T);

    case "GET":
      return get<T>(sql);

    case "PUT":
      return put(sql, payload as T);

    case "DELETE":
      return del(sql);

    default:
      throw new Error("Invalid method");
  }
}

async function post<T extends { id: number }>(
  sql: string,
  payload: T
): Promise<CreatedResponse> {
  const result = await query(sql, Object.values(payload));

  const insertResult = result as unknown as InsertResult;

  return {
    message: "Created successfully",
    id: insertResult.insertId,
  };
}

async function get<T>(sql: string): Promise<T[]> {
  const rows = await query(sql);

  return rows as T[];
}

async function put<T extends { id: number }>(
  sql: string,
  payload: T
): Promise<{ message: string }> {
  const result = await query(sql, Object.values(payload));

  const affected = result as unknown as AffectedResult;

  return {
    message: `Updated entity with id ${payload.id}, affected ${affected.affectedRows} row(s)`,
  };
}

async function del(sql: string): Promise<{ message: string }> {
  const result = await query(sql);

  const affected = result as unknown as AffectedResult;

  return {
    message: `Deleted successfully, affected ${affected.affectedRows} row(s)`,
  };
}