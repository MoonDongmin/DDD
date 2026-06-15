import type { Either } from "fp-ts/lib/Either";
import { match } from "fp-ts/lib/EitherT";

// 도메인 타입
enum Color {
  Red = "Red",
  Green = 'Green',
  Blue = 'Blue',
}

// 관련 DTO
enum ColorDto {
  Red = 1,
  Green,
  Blue,
}

const toDomain = (dto: string): Either<_, Color> => match(dto)
  .with(P.Union(ColorDto.Red, ColorDto.Green, ColorDto.Blue), i => E.right(i))
  .otherwise(() => E.left(Error(`Color ${dto} is not one of Red, Green, Blue`)));