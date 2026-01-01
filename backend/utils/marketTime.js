function isMarketOpen() {
  const ist = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const day = ist.getDay();
  const minutes = ist.getHours() * 60 + ist.getMinutes();

  if (day === 0 || day === 6) return false;
  return minutes >= 555 && minutes <= 930;
}

module.exports = isMarketOpen;
