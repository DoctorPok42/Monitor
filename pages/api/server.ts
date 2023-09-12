import { NextApiRequest, NextApiResponse } from "next";
import os from "os";

export default async function server(req: NextApiRequest, res: NextApiResponse) {
  try {
    const allData = [] as any;
    await allData.push({
      hostname: os.hostname(),
      arch: os.arch(),
      platform: os.platform(),
      release: os.release(),
      type: os.type(),
      uptime: os.uptime(),
      totalmem: os.totalmem(),
      freemem: os.freemem(),
      networkInterfaces: os.networkInterfaces(),
      os: os,
    })
    res.status(200).json(allData);
  } catch (err) {
    res.status(500).send(err);
  }
  return;
}