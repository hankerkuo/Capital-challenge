import Logger from './Logger';

describe('Logger', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should log messages with a timestamp using the log method', () => {
    const args = ['Message 1', 'Message 2'];
    const expectedLogOutput = [
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
      ...args,
    ];

    Logger.log(...args);

    expect(consoleLogSpy).toHaveBeenCalledWith(...expectedLogOutput);
  });

  it('should log error messages with a timestamp using the error method', () => {
    const args = ['Error message'];
    const expectedErrorOutput = [
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
      ...args,
    ];

    Logger.error(...args);

    expect(consoleErrorSpy).toHaveBeenCalledWith(...expectedErrorOutput);
  });
});
