export class Recipe{
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public image: string,
        public ingredients: Array<any>,
        public protein: number, //suma total
        public carbohydrates: number, //suma total
        public fat: number, //suma total
        public kcal: number, //suma total
        public sodium: number, //suma total
        public fiber: number, //suma total
        public quantity: number //peso total de la receta
    ){

    }
}