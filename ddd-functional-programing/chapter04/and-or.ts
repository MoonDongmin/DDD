class FruitSalad{
    constructor(
        readonly apple: AppleVariety,
        readonly banana: AppleVariety,
        readonly cherries: AppleVariety,
    ) {
    }
}

type FruitSnack = AppleVariety | BananaVariety | CherryVariety;
type AppleVariety = "GoldenDelicious" | "GrannySmith" | "Fuji";
type BananaVariety = "Cavendish" | "GroMichel" | "Manzano";
type CherryVariety = "Montomorency"| "Bing"