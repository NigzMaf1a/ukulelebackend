// controllers/member.ts
import { Request, Response, RequestHandler } from "express";
import MemberModel from "../models/member";
import { MemberPayload, MemberRow } from "../interfaces/member";
import { RegistrationPayload } from "../interfaces/registration";

/**
 * CREATE - Add a new member with registration
 */
export const createMember = async (req: Request, res: Response) => {
  try {
    const { regData, memberType, paymentStatus } = req.body as {
      regData: RegistrationPayload;
      memberType: MemberPayload["Type"];
      paymentStatus: MemberPayload["PaymentStatus"];
    };

    const memberModel = new MemberModel();
    const result = await memberModel.createMemberWithRegistration(
      regData,
      memberType,
      paymentStatus
    );

    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to create member", details: message });
  }
};

/**
 * READ - Get all members with registration info
 */
export const getAllMembers: RequestHandler = async (_req, res, next) => {
  try {
    const memberModel = new MemberModel();
    const rows = await memberModel.readMembersWithRegistration();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * READ - Get single member by ID
 */
export const getMemberById = async (req: Request, res: Response) => {
  try {
    const memberID = Number(req.params.memberID);
    if (isNaN(memberID)) {
      res.status(400).json({ error: "Invalid memberID" });
      return;
    }

    const memberModel = new MemberModel();
    const row = await memberModel.getMemberData(memberID);

    if (!row) {
      res.status(404).json({ error: "Member not found" });
      return;
    }

    res.status(200).json(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch member", details: message });
  }
};

/**
 * UPDATE - Update a member record
 */
export const updateMember = async (req: Request, res: Response) => {
  try {
    const memberID = Number(req.params.memberID);
    if (isNaN(memberID)) {
      res.status(400).json({ error: "Invalid memberID" });
      return;
    }

    const data: MemberPayload = req.body;
    const memberModel = new MemberModel();
    const result = await memberModel.updateMember(memberID, data);

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update member", details: message });
  }
};

/**
 * DELETE - Remove a member record
 */
export const deleteMember: RequestHandler = async (req, res, next) => {
  try {
    const memberID = Number(req.params.memberID);
    if (isNaN(memberID)) {
      res.status(400).json({ error: "Invalid memberID" });
      return;
    }

    const memberModel = new MemberModel();
    const result = await memberModel.deleteMember(memberID);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
