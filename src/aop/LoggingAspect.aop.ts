import { Aspect, AspectContext } from 'ts-aspect';

export default class LoggingAspect implements Aspect {
  execute(ctx: AspectContext): any {
    delete ctx.returnValue;
    console.log(`[Aspect logging] ${new Date().toJSON()} \
      Function call meta data: ${JSON.stringify(ctx)}`);
  }
}