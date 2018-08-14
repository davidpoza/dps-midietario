export class Diary{
    constructor(
        public _id: string,
        public date: Date,
        public proteinTarget: number, //g por kg de peso
        public carbohydratesTarget: number, //porcentaje     
        public kcalTarget: number,
        public totalProtein: number, //suma total
        public totalCarbohydrate: number, //suma total
        public totalFat: number, //suma total
        public totalKcal: number, //suma total
        public carbohydratesTargetInGrams: number, //objetivo de carbohidrato en gramos
        public fatTargetInGrams: number, //objetivo de grasa en gramos
        public proteinTargetInPercentage: number, //objetivo de proteina en porcentaje
        public fatTargetInPercentage: number,  //objetivo de grasa en porcentaje
        public meals: Array<any>
    ){

    }
}