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

      await test "selectOne", ->
        base = await Base.create configuration.airtable
        record = await base.selectOne
          table: "Test"
          query: "{Name} = 'Test'"
        assert.equal "Test", record.get "Name"

      await test "update", ->

        notes = records.get "Notes"

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

    ]

    # await test "Panda Strike", [

    #   await test "Site", ->
    #     Site.configuration = configuration.airtable
    #     site = await Site.find name: "pandastrike"
    #     assert.equal "appyqbB9hZDPhtTma", site.base

    #   await test "Page", ->
    #     page = await site.find path: "home"
    #     assert page.title?
    #     assert page.main?[0]?.title?
    #     assert page?.main?[0]?.image?.default?.url?

    #     # test that we can generate the page
    #     assert (html page)?

    # ]

    # await test "Finn Mack", [

    #   await test "Site", ->
    #     Site.configuration = configuration.airtable
    #     site = await Site.find name: "finnmack"
    #     assert.equal "appO5rOuvzueUI9P7", site.base

    #   await test "Page", ->
    #     page = await site.find path: "home"
    #     assert page.title?
    #     assert page.main?[0]?.title?

    #     # test that we can generate the page
    #     assert (html page)?

    # ]
  
    # await test "DashKite", [

    #   await test "Content", ->
    #     Site.configuration = configuration.airtable
    #     site = await Site.find name: "dashkite"
    #     content = await Content.find { site, name: "Sites Intro" }
    #     assert.equal "sites-intro", content.name
    #     assert.equal "Blog Post Template", content.pages[0].name

    # ]

    # await test "Chand (Different Key)", [

    #   await test "Page", ->
    #     Site.configuration = configuration.airtable
    #     site = await Site.find name: "chand-test-01"
    #     page = await site.find path: "home"

    # ]

  ]

  
  process.exit success

