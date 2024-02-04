export function exclude<T, Key extends keyof T>(
  obj: T,
  keys: Key[],
): Omit<T, Key> {
  const result: Partial<T> = { ...obj }; // 객체 복사
  keys.forEach((key) => {
    delete result[key]; // 지정된 키 삭제
  });
  return result as Omit<T, Key>; // 캐스팅으로 타입을 확정
}
