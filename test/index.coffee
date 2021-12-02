import { test as _test, success } from "@dashkite/amen"
import print from "@dashkite/amen-console"
import assert from "@dashkite/assert"

import configuration from "./configuration"

import { Base } from "../src"

test = (name, f) ->
  _test
    description: name
    wait: 30000
    f

do ({ site } = {}) ->

  print await test "Airtable Helpers", [

    await test "Get Site", ->
      base = await Base.create configuration.airtable
      site = await base.selectOne
        table: "Sites"
        query: "{Name} = 'dashkite'"
      assert.equal "appyqbB9hZDPhtTma", site.get "Base"

    await test "Get Content", ->
      { key } = configuration.airtable
      base = site.get "Base"
      base = await Base.create { key, base }
      content = await base.selectOne
        table: "Content"
        query: "{Name} = 'hello'"
      assert.equal "Hola, Mundo", content.get "Title"

  ]
  
  process.exit success

