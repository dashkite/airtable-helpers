import { test as _test, success } from "@dashkite/amen"
import print from "@dashkite/amen-console"
import assert from "@dashkite/assert"

import configuration from "./configuration"

import { Base } from "../src/base"
import { Site, Content } from "../src"

import html from "./helpers/html"

test = (name, f) ->
  _test
    description: name
    wait: 30000
    f

do ({ site } = {}) ->

  print await test "Airtable Helpers", [

    # await test "Base", [

    #   await test "Get Site", ->
    #     base = await Base.create configuration.airtable
    #     site = await base.selectOne
    #       table: "Sites"
    #       query: "{Name} = 'pandastrike'"
    #     assert.equal "appyqbB9hZDPhtTma", site.get "Base"

    #   await test "Get Content", ->
    #     { key } = configuration.airtable
    #     base = site.get "Base"
    #     base = await Base.create { key, base }
    #     content = await base.selectOne
    #       table: "Pages"
    #       query: "{Name} = 'Home'"
    #     assert.equal "Panda Strike", content.get "Title"

    # ]

    await test "Panda Strike", [

      await test "Site", ->
        Site.configuration = configuration.airtable
        site = await Site.find name: "pandastrike"
        assert.equal "appyqbB9hZDPhtTma", site.base

      await test "Page", ->
        page = await site.find path: "home"
        assert page.title?
        assert page.main?[0]?.title?
        assert page?.main?[0]?.image?.default?.url?

        # test that we can generate the page
        assert (html page)?

    ]

    await test "Finn Mack", [

      await test "Site", ->
        Site.configuration = configuration.airtable
        site = await Site.find name: "finnmack"
        assert.equal "appO5rOuvzueUI9P7", site.base

      await test "Page", ->
        page = await site.find path: "home"
        assert page.title?
        assert page.main?[0]?.title?

        # test that we can generate the page
        assert (html page)?

    ]
  
    await test "DashKite", [

      await test "Content", ->
        Site.configuration = configuration.airtable
        site = await Site.find name: "dashkite"
        content = await Content.find { site, name: "Sites Intro" }
        assert.equal "sites-intro", content.name
        assert.equal "Blog Post Template", content.pages[0].name

    ]


  ]
  
  process.exit success

