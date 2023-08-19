export default class Logger {
  public static log(...args: any[]) {
    console.log(new Date().toJSON(), ...args);
  }

  public static error(...args: any[]) {
    console.error('[ERROR]', new Date().toJSON(), ...args);
  }
}
