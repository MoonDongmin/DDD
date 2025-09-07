import {RouteSpecification} from "./RouteSpecification";
import {
    Itinerary,
    Leg,
}                           from "./Itinerary";
import type {NodeInfo}      from "../shipping/networkTraversal.service.ts";

export class BookingTransportNetworkTranslator {
    /** RouteSpecification → 위치코드 리스트 */
    convertConstraints(spec: RouteSpecification): string[] {
        return spec.toLocationCodeList();
    }

    /** Node 시퀀스 → Itinerary(LOAD/UNLOAD를 페어링해 Leg 생성) */
    convert(nodes: NodeInfo[]): Itinerary {
        if (!nodes.length) return new Itinerary([]);

        const legs: Leg[] = [];
        let pendingLoad: NodeInfo | null = null;

        for (const node of nodes) {
            if (node.operationType === "LOAD") {
                // 마지막 LOAD가 미처 UNLOAD와 매칭되지 않은 상태면 덮어씀(보통은 네트워크가 올바른 시퀀스를 보장)
                pendingLoad = node;
            } else {
                // UNLOAD면 직전 LOAD와 짝지어 Leg 생성
                if (!pendingLoad) {
                    throw new Error("UNLOAD가 LOAD 없이 나왔습니다. 경로 데이터가 올바른지 확인하세요.");
                }
                const leg: Leg = {
                    vesselVoyageId: pendingLoad.shippingOperation.vesselVoyageId,
                    loadDate: pendingLoad.shippingOperation.date,
                    loadLocationCode: pendingLoad.locationCode,
                    unloadDate: node.shippingOperation.date,
                    unloadLocationCode: node.locationCode,
                };
                legs.push(leg);
                pendingLoad = null; // 한 구간 완료
            }
        }

        if (pendingLoad) {
            // 마지막에 LOAD만 남아있으면 비정상
            throw new Error("마지막 LOAD에 대응되는 UNLOAD가 없습니다.");
        }

        return new Itinerary(legs);
    }
}
