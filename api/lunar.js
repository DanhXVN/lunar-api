import { Solar } from "lunar-javascript";

export default function handler(req, res) {
  try {
    // 👉 lấy ngày từ query hoặc hôm nay
    const { date } = req.query;
    const now = date ? new Date(date) : new Date();

    const solar = Solar.fromDate(now);
    const lunar = solar.getLunar();

    // ===== MAP CAN CHI =====
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

    // ===== CAN CHI NĂM =====
    const yearRaw = lunar.getYearInGanZhi();
    const canYear = yearRaw.substring(0, 1);
    const chiYear = yearRaw.substring(1);
    const canChiYear = `${canMap[canYear]} ${chiMap[chiYear]}`;

    // ===== CAN CHI NGÀY =====
    const dayRaw = lunar.getDayInGanZhi();
    const canDay = dayRaw.substring(0, 1);
    const chiDay = dayRaw.substring(1);
    const canChiDay = `${canMap[canDay]} ${chiMap[chiDay]}`;

    // ===== KẾT QUẢ =====
    res.setHeader("Cache-Control", "s-maxage=3600"); // cache 1h

    res.status(200).json({
      duong_lich: now.toLocaleDateString("vi-VN"),
      thu: now.toLocaleDateString("vi-VN", { weekday: "long" }),

      am_lich: `${lunar.getDay()}/${lunar.getMonth()}/${lunar.getYear()}`,
      ngay_am: lunar.getDay(),
      thang_am: lunar.getMonth(),
      nam_am: lunar.getYear(),

      can_chi_nam: canChiYear,
      can_chi_ngay: canChiDay,

      timestamp: now.getTime()
    });

  } catch (e) {
    res.status(500).json({
      error: "Lỗi xử lý API",
      message: e.toString()
    });
  }
}
