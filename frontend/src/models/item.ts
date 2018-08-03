export class Item{
    constructor(
        public _id: string,
        public checked: boolean,
        public name: string,
        public quantity: number,
        public minimum: number,
        public unit: string,
        public notes: string,
        public list: string,
    ){

    }
}