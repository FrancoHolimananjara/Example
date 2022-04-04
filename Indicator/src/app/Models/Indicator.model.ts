export class Indicator {
  constructor(
    public indicatorName: string,
    public descritpion: string,
    public objectif: number,
    public faible: number,
    public moyen: number,
    public bon: number,
    public createdAt: string,
    public isExpired: false
  ) { }
}
