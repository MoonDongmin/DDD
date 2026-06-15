// 튜플의 구성 요소
enum Suit {
  Heart,
  Spade,
  Diamond,
  Club
}

enum Rank {
  Ace,
  Two,
  Queen,
  King
}

// 튜플
type Card = [Suit, Rank] as const ;

// 해당하는 DTO 타입
enum SuitDto {
  Heart = 1,
  Spade,
  Diamond,
  Club
}
enum RankDto {
  Ace = 1,
  Two,
  Queen = 12,
  King
}

class CardDto {
  constructor(
    readonly suit: SuitDto,
    readonly rank: RankDto,
  ) { }
}