import { OneCountry, TwoCountry } from './dataMock/Countries'

class ResponseSingleton {
  private static instance: ResponseSingleton;
  private contryCapitalResponse;

  private constructor() {
    this.contryCapitalResponse = OneCountry;
  }

  public static getInstance(): ResponseSingleton {
    if (!ResponseSingleton.instance) {
      ResponseSingleton.instance = new ResponseSingleton();
    }
    return ResponseSingleton.instance;
  }

  public getCountryCapitalResponse() {
    return this.contryCapitalResponse;
  }
  public setCountryCapitalResponseToTwo(): void {
    this.contryCapitalResponse = TwoCountry;
  }
  public setCountryCapitalResponseToDefault(): void {
    this.contryCapitalResponse = OneCountry;
  }
}

export default ResponseSingleton;