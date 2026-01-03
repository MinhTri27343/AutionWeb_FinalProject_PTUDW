export function getTimeDifference(start: Date, end: Date): string {
  if (start > end) return "Đã kết thúc";

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  // Điều chỉnh nếu số ngày hoặc số tháng bị âm
  if (days < 0) {
    months--;
    // Lấy số ngày của tháng trước đó để bù vào
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // 1. Nếu trên 1 năm
  if (years >= 1) {
    return `${years} năm ${months} tháng`;
  }

  // 2. Nếu trên 1 tháng
  if (months >= 1) {
    return `${months} tháng ${days} ngày`;
  }

  // 3. Các trường hợp còn lại (dưới 1 tháng) dùng logic cũ của bạn
  const diffMs = end.getTime() - start.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays >= 1) {
    const hours = diffHours % 24;
    return `${diffDays} ngày ${hours} giờ`;
  } else if (diffHours >= 1) {
    const minutes = diffMinutes % 60;
    return `${diffHours} giờ ${minutes} phút`;
  } else {
    return `${diffMinutes} phút`;
  }
}

export const formatDateISO = (
  dateValue: Date | string | undefined | null
): string => {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  // Kiểm tra nếu giá trị truyền vào không phải là ngày hợp lệ
  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  // getMonth() trả về 0-11 nên phải +1, padStart để đảm bảo có 2 chữ số (ví dụ: 05)
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
