import * as Type from "@dashkite/joy/type"

eq = (a,b) -> a == b

toArray = (x) ->
  if Type.isArray x
    x
  else if Type.isDefined x
    [ x ]
  else
    []

export {
  eq
  toArray
}