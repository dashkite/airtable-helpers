import * as Meta from "@dashkite/joy/metaclass"
import * as Arr from "@dashkite/joy/array"
import * as It from "@dashkite/joy/iterable"
import * as Text from "@dashkite/joy/text"
import { marked } from "marked"
import { Base } from "./base"
import { table, fields } from "./mixins"

# start with empty classes so we can reference them
# in the class methods and mixins we add later

class Site
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

### Page ###

Meta.mixin Page, [
    table "Pages"
    fields
      name: from: "Name"
      path: from: "Path"
      title: from: "Title"
      header: from: "Header", list: Content
      main: from: "Main", list: Content
      aside: from: "Aside", list: Content
      footer: from: "Footer", list: Content
]

Page.find = ({ site, path }) ->
  if site? && path?
    { key } = Site.configuration
    { base } = site
    _base = await Base.create { key, base }
    # see note above for Site....
    self = @fromRecord await _base.selectOne
      table: @table
      query: "{Path} = '#{path}'"

    # there's probably a way to do this automatically
    # but i initially just want to make sure the mechanics
    # are all working

    # okay get the content for the pages
    await Content.load _base
    # repeat for nested content
    # we only do this for one level tho
    await Page.load _base
    await Content.load _base
    # finally, we can load all the images at once
    await Image.load _base
    self
  else
    throw new Error "Page only supporsts find by site and path"

### Content ###

buildFAClassList = (value) ->
  [ family, label... ] = Text.split "-", value
  label = It.join "-", label
  family = family[0]
  size = switch @type
    when "extra-large-copy" then "4x"
    when "large-copy" then "3x"
    else "1x"
  "fa#{family} fa-#{label} fa-#{size}"

Meta.mixin Content, [

  table "Content"

  fields
    name: from: "Name", transform: Text.dashed
    type: from: "Type", transform: Text.dashed
    title: from: "Title"
    subtitle: from: "Subtitle"
    copy: from: "Copy", transform: marked
    images: from: "Image", list: Image
    pages: from: "Pages", list: Page
    content: from: "Content", list: Content
    link: from: "Link"
    glyph: from: "Glyph", transform: (value) -> buildFAClassList @type, value
]

Meta.mixin Content::, [
  Meta.getters
    image: -> Arr.first @images
    social: ->
      github: @_.get "GitHub"
      linkedin: @_.get "LinkedIn"
      twitter: @_.get "Twitter"
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