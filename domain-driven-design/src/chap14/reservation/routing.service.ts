import {RouteSpecification}                from "./RouteSpecification";
import {Itinerary}                         from "./Itinerary";
import {BookingTransportNetworkTranslator} from "./BookingTransportNetworkTranslator";
import type {NetworkTraversalService}      from "../shipping/networkTraversal.service.ts";

export class RoutingService {
    constructor(
        private readonly traversalService: NetworkTraversalService,
        private readonly translator = new BookingTransportNetworkTranslator(),
    ) {
    }

    /** SIDE-EFFECT-FREE: 입력 spec → 새 Itinerary 반환(내부 상태 변경 없음) */
    async route(spec: RouteSpecification): Promise<Itinerary> {
        // 1) 제약을 위치코드 배열로 변환
        const constraintLocations = this.translator.convertConstraints(spec);

        // 2) 운송망 서비스에 경로 탐색 위임
        const pathNodes = await this.traversalService.findPath(constraintLocations);

        // 3) Node 시퀀스를 Itinerary로 번역
        return this.translator.convert(pathNodes);
    }
}
