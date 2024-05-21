import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    // Allow requests from your Next.js app's origin
    origin: process.env.NEXT_PUBLIC_APP_ORIGIN || "*",
    // Other options can be added here as needed
    methods: ["GET", "POST"], // Allow only specific HTTP methods
  })
);

type SheetForm = {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  ville: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests are allowed" });
  }

  const body = req.body as SheetForm;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:E1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [body.nom, body.prenom, body.telephone, body.email, body.ville],
        ],
      },
    });

    return res.status(200).json({
      data: response.data,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: "Something went wrong" });
  }
}
