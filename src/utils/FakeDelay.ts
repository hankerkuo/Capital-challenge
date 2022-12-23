const callMeToDelay = async (ms: number) => {
  const promise = () => new Promise<void>(res =>
    setTimeout(() => { res() }, ms));
  console.log(`[callMeToDelay] starts manual waiting for ${ms} secondes`);
  await promise();
  console.log(`[callMeToDelay] ends waiting for ${ms} secondes`);
}

export default callMeToDelay