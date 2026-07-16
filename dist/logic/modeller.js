"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = modeller;
const db_1 = require("../utils/db");
async function modeller(method, sql, payload) {
    switch (method) {
        case "POST":
            return post(sql, payload);
        case "GET":
            return get(sql);
        case "PUT":
            return put(sql, payload);
        case "DELETE":
            return del(sql);
        default:
            throw new Error("Invalid method");
    }
}
async function post(sql, payload) {
    const result = await (0, db_1.query)(sql, Object.values(payload));
    const insertResult = result;
    return {
        message: "Created successfully",
        id: insertResult.insertId,
    };
}
async function get(sql) {
    const rows = await (0, db_1.query)(sql);
    return rows;
}
async function put(sql, payload) {
    const result = await (0, db_1.query)(sql, Object.values(payload));
    const affected = result;
    return {
        message: `Updated entity with id ${payload.id}, affected ${affected.affectedRows} row(s)`,
    };
}
async function del(sql) {
    const result = await (0, db_1.query)(sql);
    const affected = result;
    return {
        message: `Deleted successfully, affected ${affected.affectedRows} row(s)`,
    };
}
