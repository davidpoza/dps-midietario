export class User{
    constructor(
        public _id: string,
        public name: string,
        public nick: string,
        public email: string,
        public password: string,
        public sex: string,
        public age: number,
        public height: number,
        public weight: number,
        public fat: number,
        public activity_level: number,
        public formula: number,
        public tmb: number,
        public image: string,    
    ){

    }
}