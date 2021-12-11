import * as It from "@dashkite/joy/iterable"
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

  selectAll: ({ table, query }) ->
    query = ( @_.base table ).select
      filterByFormula: query
    new Promise (resolve, reject) ->
      query.firstPage (error, records) ->
        if error?
          reject error
        else
          resolve records

  find: ({ table, id }) ->
    new Promise (resolve, reject) =>
      ( @_.base table ).find id, (error, record) ->
        if error?
          reject error
        else
        resolve record

  findAll: ({ table, ids }) ->
    @selectAll
      table: table
      query: do ->
        conditions = do ->
          for id in ids
            "RECORD_ID() = '#{id}'"
        "OR( #{ It.join ", ", conditions })"


export {
  Base
}