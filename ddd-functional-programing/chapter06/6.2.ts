declare const _kilogram: unique symbol;
type Kilogram = number & { [_kilogram]: never }; // _kilogram 브랜딩
function kilogram(i: number): Kilogram {
    return i as Kilogram
}

declare const _meter: unique symbol;
type Meter = number & { [_meter]: never };

function meter(i: number): Meter {
    return i as Meter
}

let fiveKilos = kilogram(5.0);
let fiveMeters = meter(5.0);

// fiveKilos = fiveMeters;

class KilogramQuantity {
    constructor(readonly value: Kilogram) {
    }
}