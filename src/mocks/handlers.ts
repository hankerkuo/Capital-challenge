import { setupWorker, rest } from 'msw'
import { OneCountry } from './dataMock/Countries'

export const handlers = [
  rest.get(
    `${process.env.TEST_URL}/api/capital-challenge/country-capital`, async (req, res, ctx) => {
      return res(
        ctx.json(OneCountry)
      )
    }),
]