export class Propulsor {
    private _id: string;
    private _maxpower: number;
  
    constructor(maxpower: number, id: string) {
      this._id = id;
      this._maxpower = maxpower;
    }
  
    public get id(): string {
      return this._id;
    }

    public get maxpower(): number {
      return this._maxpower;
    }
  }
  