// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function add_contact(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { name, email } = req.body;
      const contact = await prisma?.contact.create({ data: { name, email } });
    } catch (error) {
      res.status(500).json({ name: "Something went wrong" });
    }
  }
  res.status(200).json({ name: "John Doe" });
}
