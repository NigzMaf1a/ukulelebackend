import { Request, Response, RequestHandler } from "express";
import OrderItemModel from "../models/orderItem";
import { OrderItemPayload } from "../interfaces/orderItem";


// CREATE
export const createOrderItem = async (req: Request, res: Response) => {

  try {

    const payload: OrderItemPayload = req.body;

    const orderItem = new OrderItemModel();
    const result = await orderItem.createOrderItem(payload);

    res.status(201).json(result);

  } catch (err) {

    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to create order item",
      details: message
    });

  }

};


// READ ALL
export const readOrderItem: RequestHandler = async (_req, res, next) => {

  try {

    const orderItem = new OrderItemModel();
    const rows = await orderItem.readOrderItem();

    res.status(200).json(rows);

  } catch (err) {
    next(err);
  }

};


// READ SINGLE
export const getOrderItemData = async (req: Request, res: Response) => {

  const id = Number(req.params.orderItemID);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid orderItemID" });
    return;
  }

  try {

    const orderItem = new OrderItemModel();
    const row = await orderItem.getOrderItemData(id);

    if (!row) {
      res.status(404).json({ error: "Order item not found" });
      return;
    }

    res.status(200).json(row);

  } catch (err) {

    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to fetch order item",
      details: message
    });

  }

};


// UPDATE
export const updateOrderItem = async (req: Request, res: Response) => {

  const id = Number(req.params.orderItemID);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid orderItemID" });
    return;
  }

  try {

    const payload: OrderItemPayload = req.body;

    const orderItem = new OrderItemModel();
    const result = await orderItem.updateOrderItem(id, payload);

    res.status(200).json(result);

  } catch (err) {

    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to update order item",
      details: message
    });

  }

};


// DELETE
export const deleteOrderItem: RequestHandler = async (req, res, next) => {

  const id = Number(req.params.orderItemID);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid orderItemID" });
    return;
  }

  try {

    const orderItem = new OrderItemModel();
    const result = await orderItem.deleteOrderItem(id);

    res.status(200).json(result);

  } catch (err) {
    next(err);
  }

};