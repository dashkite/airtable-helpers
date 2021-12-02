import { getSecret } from "@dashkite/dolores/secrets"
import Airtable from "airtable"

class Base

  @create: ({key, base}) ->
    client = new Airtable apiKey: await getSecret key
    base = client.base base
    Object.assign (new @), _: { client, base }

  selectOne: ({ table, query }) ->
    query = ( @_.base table ).select
      filterByFormula: query
      maxRecords: 1
    new Promise (resolve, reject) ->
      query.firstPage (error, records) ->
        if error?
          reject error
        else
          resolve records[0]

export {
  Base
}