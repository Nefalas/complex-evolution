export default class NumberHelper {
  public static randomIntIncl(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static randomIntExcl(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}