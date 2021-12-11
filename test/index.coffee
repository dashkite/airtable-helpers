import { test as _test, success } from "@dashkite/amen"
import print from "@dashkite/amen-console"
import assert from "@dashkite/assert"

import configuration from "./configuration"

import { Base } from "../src/base"
import { Site } from "../src"

import html from "./html"

test = (name, f) ->
  _test
    description: name
    wait: 30000
    f

do ({ site } = {}) ->

  print await test "Airtable Helpers", [

    await test "Base", [

      await test "Get Site", ->
        base = await Base.create configuration.airtable
        site = await base.selectOne
          table: "Sites"
          query: "{Name} = 'pandastrike'"
        assert.equal "appyqbB9hZDPhtTma", site.get "Base"

      await test "Get Content", ->
        { key } = configuration.airtable
        base = site.get "Base"
        base = await Base.create { key, base }
        content = await base.selectOne
          table: "Pages"
          query: "{Name} = 'Home'"
        assert.equal "Panda Strike", content.get "Title"

    ]

  await test "Site", ->
    Site.configuration = configuration.airtable
    site = await Site.find name: "pandastrike"
    assert.equal "appyqbB9hZDPhtTma", site.base

  await test "Page", ->
    page = await site.find path: "home"
    assert page.title?
    assert page.main?[0]?.title?
    assert page?.main?[0]?.image?.default?.url?

  ]
  
  process.exit success

