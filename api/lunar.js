import { Solar } from "lunar-javascript";

export default function handler(req, res) {
  const now = new Date();
  const solar = Solar.fromDate(now);
  const lunar = solar.getLunar();

  // chuyển can chi sang tiếng Việt
  const canChi = lunar.getYearInGanZhi()
    .replace("丙", "Bính")
    .replace("丁", "Đinh")
    .replace("戊", "Mậu")
    .replace("己", "Kỷ")
    .replace("庚", "Canh")
    .replace("辛", "Tân")
    .replace("壬", "Nhâm")
    .replace("癸", "Quý")
    .replace("甲", "Giáp")
    .replace("乙", "Ất")
    .replace("子", "Tý")
    .replace("丑", "Sửu")
    .replace("寅", "Dần")
    .replace("卯", "Mão")
    .replace("辰", "Thìn")
    .replace("巳", "Tỵ")
    .replace("午", "Ngọ")
    .replace("未", "Mùi")
    .replace("申", "Thân")
    .replace("酉", "Dậu")
    .replace("戌", "Tuất")
    .replace("亥", "Hợi");

  res.status(200).json({
    duong_lich: now.toLocaleDateString("vi-VN"),
    am_lich: `${lunar.getDay()}/${lunar.getMonth()}/${lunar.getYear()}`,
    can_chi: canChi
  });
}
