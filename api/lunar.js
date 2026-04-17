import { Solar } from "lunar-javascript";

export default function handler(req, res) {
  const now = new Date();
  const solar = Solar.fromDate(now);
  const lunar = solar.getLunar();

  // chuyển can chi sang tiếng Việt
  const raw = lunar.getYearInGanZhi();

// tách can và chi
const can = raw.substring(0, 1);
const chi = raw.substring(1);

// map sang tiếng Việt
const canMap = {
  "甲": "Giáp", "乙": "Ất", "丙": "Bính", "丁": "Đinh",
  "戊": "Mậu", "己": "Kỷ", "庚": "Canh", "辛": "Tân",
  "壬": "Nhâm", "癸": "Quý"
};

const chiMap = {
  "子": "Tý", "丑": "Sửu", "寅": "Dần", "卯": "Mão",
  "辰": "Thìn", "巳": "Tỵ", "午": "Ngọ", "未": "Mùi",
  "申": "Thân", "酉": "Dậu", "戌": "Tuất", "亥": "Hợi"
};

const canChi = `${canMap[can]} ${chiMap[chi]}`;
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
