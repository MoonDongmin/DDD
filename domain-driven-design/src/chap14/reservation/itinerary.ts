export type Leg = {
    vesselVoyageId: string;
    loadDate: string;         // ISO string
    loadLocationCode: string;
    unloadDate: string;       // ISO string
    unloadLocationCode: string;
};

export class Itinerary {
    constructor(public readonly legs: Leg[]) {
    }

    get isEmpty(): boolean {
        return this.legs.length === 0;
    }
}
