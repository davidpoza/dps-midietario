export class User{
    constructor(
        public _id: string,
        public name: string,
        public nick: string,
        public email: string,
        public password: string,
        public sex: number,
        public age: number,
        public height: number,
        public weight: number,
        public fat: number,
        public activity_level: number,
        public formula: number,
        public bmr: number,
        public image: string,
        public proteinTarget: number, //el gramos por kilo de peso
        public carbohydratesTarget: number, //el porcentaje del total calórico
        public kcalTarget: number    
    ){

    }
}