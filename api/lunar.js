import { Solar } from "lunar-javascript";

export default function handler(req, res) {
  const now = new Date();
  const solar = Solar.fromDate(now);
  const lunar = solar.getLunar();

  return res.status(200).json({
    duong_lich: now.toLocaleDateString("vi-VN"),
    am_lich: `${lunar.getDay()}/${lunar.getMonth()}/${lunar.getYear()}`,
    can_chi: lunar.getYearInGanZhi()
  });
}
