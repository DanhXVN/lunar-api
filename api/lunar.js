import { Solar } from "lunar-javascript";

// ===== MAP CAN CHI =====
const CAN_MAP = {
  "甲": "Giáp", "乙": "Ất", "丙": "Bính", "丁": "Đinh",
  "戊": "Mậu", "己": "Kỷ", "庚": "Canh", "辛": "Tân",
  "壬": "Nhâm", "癸": "Quý"
};

const CHI_MAP = {
  "子": "Tý", "丑": "Sửu", "寅": "Dần", "卯": "Mão",
  "辰": "Thìn", "巳": "Tỵ", "午": "Ngọ", "未": "Mùi",
  "申": "Thân", "酉": "Dậu", "戌": "Tuất", "亥": "Hợi"
};

// ===== FORMAT DATE =====
function formatDate(date) {
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

// ===== FORMAT THỨ =====
function formatWeekday(date) {
  return date.toLocaleDateString("vi-VN", {
    weekday: "long"
  });
}

// ===== CHUYỂN CAN CHI =====
function toCanChi(raw) {
  const can = raw.substring(0, 1);
  const chi = raw.substring(1);
  return `${CAN_MAP[can]} ${CHI_MAP[chi]}`;
}

// ===== API HANDLER =====
export default function handler(req, res) {
  try {
    // 👉 lấy date từ query (?date=2026-04-17)
    const { date } = req.query;

    let now = date ? new Date(date) : new Date();

    // fix timezone VN (tránh lệch ngày trên server)
    now = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

    const solar = Solar.fromDate(now);
    const lunar = solar.getLunar();

    // ===== DATA =====
    const result = {
      duong_lich: formatDate(now),
      thu: formatWeekday(now),

      am_lich: `${lunar.getDay()}/${lunar.getMonth()}/${lunar.getYear()}`,
      ngay_am: lunar.getDay(),
      thang_am: lunar.getMonth(),
      nam_am: lunar.getYear(),

      can_chi_nam: toCanChi(lunar.getYearInGanZhi()),
      can_chi_thang: toCanChi(lunar.getMonthInGanZhi()),
      can_chi_ngay: toCanChi(lunar.getDayInGanZhi()),

      timestamp: now.getTime()
    };

    // ===== CACHE (tăng tốc Vercel) =====
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      error: "API_ERROR",
      message: err.toString()
    });
  }
}
