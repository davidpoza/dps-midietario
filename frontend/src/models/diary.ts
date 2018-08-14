export class Diary{
    constructor(
        public _id: string,
        public date: Date,
        public proteinTarget: number, //g por kg de peso
        public carbohydratesTarget: number, //porcentaje
        public kcalTarget: number,
        public totalProtein: number,
        public totalCarbohydrate: number,
        public totalFat: number,
        public totalKcal: number,
        public meals: Array<any>
    ){

    }
}