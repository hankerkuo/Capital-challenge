import { Aspect, AspectContext } from 'ts-aspect';
import Logger from 'src/utils/Logger';

export default class LoggingAspect implements Aspect {
  execute(ctx: AspectContext): any {

    delete ctx.returnValue;
    let metaData = null;
    try {
      metaData = JSON.stringify(ctx);
    } catch(e) {
      // incase circular reference appearing in ctx object
      if (e instanceof TypeError) {
        Logger.log('[Aspect logging notice]', 
          'Failed trasforming context to json, log function name only');
        metaData = JSON.stringify(ctx.methodName);
      } else {
        Logger.error(e);
      }
    }
    Logger.log(`[Aspect logging] Function call meta data: ${metaData}`);
  }
}