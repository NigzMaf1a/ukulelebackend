import { Request, Response, RequestHandler } from "express";
import OrderPayment from "../models/orderPayment";
import { OrderPaymentPayload } from "../interfaces/orderPayment";


// CREATE
export const createOrderPayment = async (req: Request, res: Response) => {
  try {

    const payload: OrderPaymentPayload = req.body;

    const orderPayment = new OrderPayment();
    const result = await orderPayment.createOrderPayment(payload);

    res.status(201).json(result);

  } catch (err) {

    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to create order payment",
      details: message
    });

  }
};


// READ ALL
export const readOrderPayment: RequestHandler = async (_req, res, next) => {
  try {

    const orderPayment = new OrderPayment();
    const rows = await orderPayment.readOrderPayment();

    res.status(200).json(rows);

  } catch (err) {
    next(err);
  }
};


// READ SINGLE
export const getOrderPaymentData = async (req: Request, res: Response) => {

  const id = Number(req.params.orderPayID);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid orderPayID" });
    return;
  }

  try {

    const orderPayment = new OrderPayment();
    const row = await orderPayment.getOrderPaymentData(id);

    if (!row) {
      res.status(404).json({ error: "Order payment not found" });
      return;
    }

    res.status(200).json(row);

  } catch (err) {

    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to fetch order payment",
      details: message
    });

  }
};


// UPDATE
export const updateOrderPayment = async (req: Request, res: Response) => {

  const id = Number(req.params.orderPayID);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid orderPayID" });
    return;
  }

  try {

    const payload: OrderPaymentPayload = req.body;

    const orderPayment = new OrderPayment();
    const result = await orderPayment.updateOrderPayment(id, payload);

    res.status(200).json(result);

  } catch (err) {

    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to update order payment",
      details: message
    });

  }
};


// DELETE
export const deleteOrderPayment: RequestHandler = async (req, res, next) => {

  const id = Number(req.params.orderPayID);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid orderPayID" });
    return;
  }

  try {

    const orderPayment = new OrderPayment();
    const result = await orderPayment.deleteOrderPayment(id);

    res.status(200).json(result);

  } catch (err) {
    next(err);
  }
};