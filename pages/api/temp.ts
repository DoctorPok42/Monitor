import { NextApiRequest, NextApiResponse } from "next";
import si from "systeminformation";

export default async function temp(req: NextApiRequest, res: NextApiResponse) {
  try {
    const allData = [] as any;
    await si.cpuTemperature().then(data => {
      allData.push(data)
    })
    res.status(200).json(allData);
  } catch (err) {
    res.status(500).send(err);
  }
  return;
}