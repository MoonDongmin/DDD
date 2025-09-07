export class RouteSpecification {
    constructor(
        public readonly origin: string,               // 출발지 코드
        public readonly destination: string,          // 도착지 코드
        public readonly customsClearance?: string,     // (선택) 통관 지점
    ) {
    }

    toLocationCodeList(): string[] {
        const codes = [this.origin];
        if (this.customsClearance) codes.push(this.customsClearance);
        codes.push(this.destination);
        return codes;
    }
}
