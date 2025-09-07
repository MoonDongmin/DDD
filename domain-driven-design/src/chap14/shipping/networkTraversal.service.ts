export type OperationType = "LOAD" | "UNLOAD";

export type NodeInfo = {
    id: string;
    locationCode: string;
    operationType: OperationType;
    shippingOperation: {
        vesselVoyageId: string;
        date: string; // ISO string
    };
};

export interface NetworkTraversalService {
    /**
     * 주어진 위치코드 순서를 만족하는 경로를 찾아
     * (LOAD/UNLOAD가 섞인) NodeInfo 시퀀스를 반환
     */
    findPath(locationCodes: string[]): Promise<NodeInfo[]>;
}
