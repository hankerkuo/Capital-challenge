import { Aspect, AspectContext } from 'ts-aspect';

export default class LoggingAspect implements Aspect {
  execute(ctx: AspectContext): any {

    delete ctx.returnValue;
    let metaData = null;
    try {
      metaData = JSON.stringify(ctx);
    } catch(e) {
      // incase circular reference appearing in ctx object
      if (e instanceof TypeError) {
        console.log('[Aspect logging Error] \
          Failed trasforming context to json, log function name only');
        // console.error(e);
        metaData = JSON.stringify(ctx.methodName);
      } else {
        console.error(e);
      }
    }
    console.log(`[Aspect logging] ${new Date().toJSON()} \
      Function call meta data: ${metaData}`);
  }
}