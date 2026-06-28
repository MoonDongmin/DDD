// 영업 시간 설정
const isBusinessHour = (hour: number) => 9 <= hour && hour <= 17;

// 변환기
const businessHourOnly = (getHour) => (onError) => (onSuccess) =>
  isBusinessHour(getHour())
    ? onSuccess()
    : onError();