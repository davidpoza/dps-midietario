export class Recipe{
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public image: string,
        public ingredients: Array<any>,
        public totalProtein: number, //suma total
        public totalCarbohydrate: number, //suma total
        public totalFat: number, //suma total
        public totalKcal: number, //suma total
    ){

    }
}