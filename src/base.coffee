import * as It from "@dashkite/joy/iterable"
import { getSecret } from "@dashkite/dolores/secrets"
import Airtable from "airtable"

class Base

  @create: ({secret, base}) ->
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

  selectAll: ({ table, query, fields, maxRecords, pageSize, sort, view, cellFormat, timeZone, userLocale }) ->
    pageSize ?= 100
    table = @_.base table
    records = []

    parameters = { pageSize }
    parameters.fields = fields if fields?
    parameters.filterByFormula = query if query?
    parameters.maxRecords = maxRecords if maxRecords?
    parameters.sort = sort if sort?
    parameters.view = view if view?
    parameters.cellFormat = cellFormat if cellFormat?
    parameters.timeZone = timeZone if timeZone?
    parameters.userLocale = userLocale if userLocale?

    new Promise (resolve, reject) ->
      accumulate = (pageRecords, fetchNextPage) ->
        records.push pageRecords...
        fetchNextPage()

      done = (error) ->
        if error?
          reject error
        else
          resolve records
   
      table
        .select parameters
        .eachPage accumulate, done


  find: ({ table, id }) ->
    new Promise (resolve, reject) =>
      ( @_.base table ).find id, (error, record) ->
        if error?
          if error.statusCode == 404
            resolve()
          else
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

  replace: ({ table, id, fields }) ->
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