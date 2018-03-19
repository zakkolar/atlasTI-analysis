let xpath = require('xpath')
let Dom = require('xmldom').DOMParser
let select = xpath.useNamespaces({'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'})
export class DocReader {
  constructor (xml) {
    this._doc = new Dom().parseFromString(xml)
  }

  getStyleNodes (style) {
    return select('//w:pPr/w:pStyle', this._doc).filter((node) => {
      return node.getAttributeNode('w:val').nodeValue === style
    })
  }

  getSectionsByStyle (style) {
    return this.getStyleNodes(style).map((node) => {
      return node.parentNode.parentNode
    })
  }

  getSectionsUnderStyle (style) {
    return this.getSectionsByStyle(style).map((node) => {
      return {
        section: node,
        children: getSectionsUnderNode(node, style)
      }
    })
  }
}

function getStyleOfNode (node) {
  if (node.localName === 'p') {
    return node.getElementsByTagName('w:pPr')[0].getElementsByTagName('w:pStyle')[0].getAttributeNode('w:val').nodeValue
  }
  return null
}

function getSectionsUnderNode (node, stopStyle) {
  let nextNode = node.nextSibling
  let collectedNodes = []
  while (nextNode !== undefined && nextNode !== null && getStyleOfNode(nextNode) !== stopStyle) {
    if (nextNode.localName === 'p') {
      collectedNodes.push(nextNode)
    }
    nextNode = nextNode.nextSibling
  }
  return collectedNodes
}

function cleanText (text) {
  text = text.replace(/○/g, '')
  text = text.trim()
  return text
}

export function GetTextFromNode (node) {
  let tags = node.getElementsByTagName('w:t')
  return cleanText(tags[tags.length - 1].firstChild.nodeValue)
}
