import {DocReader, GetTextFromNode} from './DocReader'

export class CodeExtractor {
  constructor (xml) {
    this._doc = new DocReader(xml)
    this._codes = []
    this.collectCodes()
  }

  collectCodes () {
    let nodes = this._doc.getSectionsUnderStyle('Heading1')
    for (let node of nodes) {
      let instances = extractCodesFromList(node.children)
      let code = GetTextFromNode(node.section)

      this._codes.push({
        code: code,
        instances: instances
      })
    }
  }

  getCodes () {
    return this._codes
  }
}

function extractCodesFromList (nodeList) {
  let quotations = []
  nodeList.splice(0, 1)
  for (let i = 0; i < nodeList.length; i += 3) {
    let quoteTitle = i
    let documentTitle = i + 2

    let quoteInfo = extractQuoteInfo(GetTextFromNode(nodeList[quoteTitle]))
    let documentInfo = extractDocumentInfo(GetTextFromNode(nodeList[documentTitle]))

    quotations.push({
      start: quoteInfo.quoteStart,
      end: quoteInfo.quoteEnd,
      user: documentInfo.user
    })
  }
  return quotations
}

function extractDocumentInfo (title) {
  let parts = title.split(' ')

  return {
    documentID: parts[0],
    user: parts[1],
    date: parts[2]

  }
}

function extractQuoteInfo (quote) {
  let parts = quote.split(' ')
  return {
    quoteID: parts[0],
    quoteStart: parts[1],
    quoteEnd: parts[3]
  }
}
