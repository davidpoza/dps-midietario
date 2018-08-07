export class Food{
    constructor(
        public _id: string,
        public name: string,
        public image: string,
        public brand: string,
        public soldin: Array<string>,
        public kgprice: number,
        public kcal: number,
        public sodium: number,
        public fiber: number,
        public sugar: number,
        public protein: number,
        public carbohydrates: number,
        public fat: number,
        public sat_fat: number,
        public mono_fat: number,
        public poli_fat: number,
        public omega3: number,
        public omega6: number,
        public omega9: number,
    ){

    }
}