import * as Meta from "@dashkite/joy/metaclass"
import * as Arr from "@dashkite/joy/array"
import * as It from "@dashkite/joy/iterable"
import * as Text from "@dashkite/joy/text"
import { marked } from "marked"
import { Base } from "./base"
import { table, fields } from "./mixins"

# some property transforms

whenDefined = (f) -> (value) -> if value? then f value

buildClassList = (tags) ->
  if tags?
    It.join " ", do ->
      for tag in tags
        Text.dashed Text.toLowerCase tag
  else
    ""

buildFAClassList = (value) ->
  # ex: solid-lightbuld-dollar
  # ex: brand-github
  if value?
    [ family, label... ] = Text.split "-", value
    label = It.join "-", label
    family = family[0]
    size = if @hints.includes "larger" then "2x"
    else if @hints.includes "largest" then "4x"
    else "1x"
    "fa#{family} fa-#{label} fa-#{size}"
  else
    ""

# start with empty classes so we can reference them
# in the class methods and mixins we add later

class Site
class People
class Page
class Content
class Image

### Site ###

Meta.mixin Site, [
  table "Sites"
  fields
    base: from: "Base"
    name: from: "Name"
]

Site.find = ({ name }) ->
  if name?
    @base ?= await do =>
      if @configuration?
        { key, base } = @configuration
        Base.create { key, base }
      else
        throw new Error "Site configuration not set"

    # we have the metadata to build this query dynamically,
    # but since we only do this twice so far (here and in Page)
    # i haven't bothered...
    @fromRecord await @base.selectOne
      table: "Sites"
      query: "{Name} = '#{name}'"
  else
    throw new Error "Site only supports find by name"

Site::find = ({path}) -> Page.find site: @, path: path

### People ###

Meta.mixin People, [
  table "People"
  fields
    name: from: "Name"
]

### Page ###

Meta.mixin Page, [
    table "Pages"
    fields
      name: from: "Name"
      path: from: "Path"
      title: from: "Title"
      theme: from: "Theme", transform: buildClassList
      layout: from: "Layout", transform: buildClassList
      header: from: "Header", list: Content
      main: from: "Main", list: Content
      aside: from: "Aside", list: Content
      footer: from: "Footer", list: Content
]

Meta.mixin Page::, [
  Meta.getters
    link: -> "/#{@site.name}/#{@path}"
    fonts: ->
      if ( fonts = @_.get "Fonts" )?
        heading: fonts[0]
        copy: fonts[1]
        accent: fonts[2]
        monospace: fonts[3]

  # allow these to be overwritten
  Meta.setters
    main: (values) -> Object.defineProperty @, "main", value: values
    title: (value) -> Object.defineProperty @, "title", { value }

]

Page.find = ({ site, path }) ->

  if site? && path?
    { key } = Site.configuration
    base = await Base.create { key, base: site.base }
    # see note above for Site....
    self = @fromRecord await base.selectOne
      table: @table
      query: "{Path} = '#{path}'"

    # remember which site we're on
    self.site = site

    # there's probably a way to do this automatically
    # but i initially just want to make sure the mechanics
    # are all working

    # okay get the content for the pages
    await Content.load { base, site }
    # repeat for nested content
    # we only do this for one level tho
    await Page.load { base, site }
    await Content.load { base, site }
    # finally, we can load all the images at once
    await Image.load { base, site }
    await People.load { base, site }
    self
  else
    throw new Error "Page only supporsts find by site and path"

### Content ###

Content.find = ({ site, name }) ->

  if site? && name?
    { key } = Site.configuration
    base = await Base.create { key, base: site.base }
    # see note above for Site....
    self = @fromRecord await base.selectOne
      table: @table
      query: "{Name} = '#{name}'"

    # there's probably a way to do this automatically
    # but i initially just want to make sure the mechanics
    # are all working

    # load the content's page
    page = await Page.load { base, site }
    # remember which site we're on
    page.site = site

    # load all the related content
    await Content.load { base, site }
    # finally, we can load all the images at once
    await Image.load { base, site }
    # same with people
    await People.load { base, site }
    self
  else
    throw new Error "Content only supporsts find by site and name"

Meta.mixin Content, [

  table "Content"

  fields
    name: from: "Name", transform: whenDefined Text.dashed
    type: from: "Type", transform: whenDefined Text.dashed
    hints: from: "Hints", transform: buildClassList
    title: from: "Title"
    subtitle: from: "Subtitle"
    published: from: "Published"
    authors: from: "Authors", list: People
    # TODO possibly add a fallback for blurb
    blurb: from: "Blurb", transform: whenDefined marked
    copy: from: "Copy", transform: whenDefined marked
    images: from: "Image", list: Image
    pages: from: "Pages", list: Page
    content: from: "Content", list: Content
    link: from: "Link", transform: (path) -> "/#{@site.name}/#{path}"
    glyph: from: "Glyph", transform: buildFAClassList
]

Meta.mixin Content::, [
  Meta.getters

    path: ->
      if @type == "article"
        encodeURI "/#{@site.name}/articles/#{@_.get 'Name'}"

    classes: ->
      classList = @type
      if @hints != "" then classList += " #{@hints}"
      classList

    image: -> Arr.first @images
    social: ->
      github: @_.get "GitHub"
      linkedin: @_.get "LinkedIn"
      twitter: @_.get "Twitter"
      blog: @_.get "Blog"
    hasSocials: ->
      @social.github? || @social.linkedin? || @social.twitter? || @social.blog?

]

### Image ####

Meta.mixin Image, [
  table "Images"
  fields
    attachments: from: "Attachments"
    description: from: "Description"
]

Meta.mixin Image::, [
  Meta.getters
    default: -> Arr.first @attachments
    dark: -> Arr.second @attachments
]

export {
  Site
  Page
  Content
  Image
}