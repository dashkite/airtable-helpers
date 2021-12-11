import * as Meta from "@dashkite/joy/metaclass"
import * as Arr from "@dashkite/joy/array"
import * as It from "@dashkite/joy/iterable"
import { eq, toArray } from "./helpers"

table = (table) ->
  (type) ->
    type._ =
      cms: {}
      pending: []
    type.table = table
    type.fromRecord = (record) ->
      self = Object.assign (new type), _: record
      self.prepare?()
      self
    type.fromID = (id) -> @_.cms[ id ]
    type.enqueue = (ids) ->
      for id in ids when ! (( @_.cms[ id ]? ) || ( id in @_.pending ))
        @_.pending.push id
      type._.pending = It.uniqueBy eq, Arr.cat ids, type._.pending
    type.load = (base) ->
      unless @_.pending.length == 0
        records = await base.findAll table: @table, ids: @_.pending
        @_.pending = []
        for record in records
          @_.cms[ record.id ] = @fromRecord record

fields = (map) ->

  (type) ->
    type.fields = map

    type::prepare = ->
      for key, field of @constructor.fields when field.list?
        field.list.enqueue toArray @_.get field.from

    Meta.mixin type::, do ->
      for name, description of map
        Meta.getter name, do (name, description) ->
          if description.list?
            ->
              @_list ?=
                description.list.fromID id for id in ( toArray @_.get description.from )
          else if description.transform?
            -> description.transform.call @, @_.get description.from
          else
            -> @_.get description.from

export {
  table
  fields
}