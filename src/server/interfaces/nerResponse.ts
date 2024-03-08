interface Intent {
    category: string;
    condifenceScore: number;
};

interface Entity {
    category: string;
    text: string;
    confidenceScore: number;
}

export interface NERResponse {
    topIntent: string;
    intents: Array<Intent>;
    entities: Array<Entity>
}
