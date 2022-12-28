import { rest } from 'msw'
import ResponseSingleton from './ResponseSingleton'

export const handlers = [
  rest.get(
    `${process.env.TEST_URL}/api/capital-challenge/country-capital`, async (req, res, ctx) => {
      console.log('mocking country-capital');
      const responseSingleton = ResponseSingleton.getInstance();
      return res(
        ctx.json(responseSingleton.getCountryCapitalResponse())
      )
    }),
]