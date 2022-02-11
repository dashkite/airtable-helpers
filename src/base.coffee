import * as It from "@dashkite/joy/iterable"
import { getSecret } from "@dashkite/dolores/secrets"
import Airtable from "airtable"

class Base

  @create: ({ secret, base }) ->
    client = new Airtable apiKey: await getSecret secret
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
    table = @_.base table
    result = if query?
      table.select filterByFormula: query
    else
      table.select()
    new Promise (resolve, reject) ->
      result.firstPage (error, records) ->
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

  create: ({ table, records }) ->
    new Promise ( resolve, reject ) =>
      ( @_.base table ).create ( fields: record for record in records ), ( error, records ) ->
        if error?
          reject error
        else
          resolve records


  update: ({ table, id, fields }) ->
    new Promise ( resolve, reject ) =>
      ( @_.base table ).update [ { id, fields } ], (error, records) ->
        if error?
          reject error
        else
          resolve records[0]

  delete: ({ table, id }) ->
    new Promise ( resolve, reject ) =>
      ( @_.base table ).destroy id, (error, records) ->
        if error?
          reject error
        else
          resolve()

export {
  Base
}