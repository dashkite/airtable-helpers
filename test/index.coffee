import { test as _test, success } from "@dashkite/amen"
import print from "@dashkite/amen-console"
import assert from "@dashkite/assert"

import configuration from "./configuration"

import { Base } from "../src/base"
import { Site, Page, Content } from "../src"

import html from "./helpers/html"

test = (name, f) ->
  _test
    description: name
    wait: 30000
    f

do ({ base, record } = {}) ->

  print await test "Airtable Helpers", [

    await test "Base", [

      await test "create", ->
        base = await Base.create configuration.airtable
        await base.create
          table: "Test"
          records: [
            "Name": "Test"
            "Notes": "This is a test."
          ]

      await test "selectOne", ->
        record = await base.selectOne
          table: "Test"
          query: "{Name} = 'Test'"
        assert.equal "Test", record.get "Name"

      await test "update", ->

        notes = record.get "Notes"

        if notes == "This is a test."
          notes = "This is not a test."
        else
          notes = "This is a test."

        record = await base.update
          table: "Test"
          id: record.id
          fields:
            Notes: notes
        
        assert.equal notes, record.get "Notes"

      await test "delete", ->
        await base.delete
          table: "Test"
          id: record.id

    ]


  ]

  
  process.exit success

