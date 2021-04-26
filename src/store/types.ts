import Cohet from "@/models/cohet"

export interface RootState {
    cohets: Map<string, Cohet>;
}