import { Request, Response, RequestHandler } from "express";
import Orders from "../models/orders";
import { OrderPayload} from "../interfaces/orders";
import { OrderItemPayload } from "../interfaces/orderItem";

/**
 * CREATE - Add a new order with items
 */
// export const createOrder = async (req: Request, res: Response) => {
//   try {
//     const payload: OrderPayload & { items: OrderItemPayload[] } = req.body;

//     if (!Array.isArray(payload.items) || payload.items.length === 0) {
//       return res.status(400).json({ error: "Order must include at least one item" });
//     }

//     const order = new Orders();
//     const result = await order.createOrder(payload);

//     res.status(201).json(result);
//   } catch (err) {
//     const message = err instanceof Error ? err.message : "Unknown error";
//     res.status(500).json({ error: "Failed to create order", details: message });
//   }
// };

/**
 * READ ALL - Get all orders
 */
export const readOrders: RequestHandler = async (_req, res, next) => {
  try {
    const order = new Orders();
    const rows = await order.readOrders();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * READ SINGLE - Get order by ID
 */
export const getOrderData = async (req: Request, res: Response) => {
  const id = Number(req.params.orderID);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid orderID" });

  try {
    const order = new Orders();
    const row = await order.getOrderData(id);
    if (!row) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch order", details: message });
  }
};

/**
 * UPDATE - Update order
 */
export const updateOrder = async (req: Request, res: Response) => {
  const id = Number(req.params.orderID);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid orderID" });

  try {
    const payload: OrderPayload = req.body;
    const order = new Orders();
    const result = await order.updateOrder(id, payload);
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update order", details: message });
  }
};

/**
 * DELETE - Remove order
 */
export const deleteOrder: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.orderID);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid orderID" });

  try {
    const order = new Orders();
    const result = await order.deleteOrder(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};