/* eslint-disable */

import {Project} from "./Project";
import * as AtlasItems from "./AtlasItems";

let xpath = require('xpath')
let Dom = require('xmldom').DOMParser
export class ProjectReader {
  constructor (xml) {
    this._xmlDoc = new Dom().parseFromString(xml)

    this._documents = {}

    this._quotations = {}

    this._codes = {}

    this._project = new Project()

    this.extractDocuments()
    this.extractQuotes()
    this.extractCodes()
    this.extractMetadata()

    this.processCodeLinks()

    this._project.setDocuments(this._documents)
    this._project.setQuotations(this._quotations)
    this._project.setCodes(this._codes)

  }

  processCodeLinks(){
    let codeList = this.getRawCodeList()
    for(let codeLink of codeList){
      let codeId = attribute(codeLink, 'obj')
      let quoteId = attribute(codeLink, 'qRef')

      let quote = this._quotations[quoteId]
      let code = this._codes[codeId]

      quote.addCode(code)
      code.addQuote(quote)
    }
  }

  extractMetadata(){
    this._project.setTitle(this.getTitle())
    this._project.setModified(this.getModified())

  }

  getTitle(){
    return attribute(this.getNodes('//storedHU/hermUnit')[0],'name')
  }

  getModified(){
    return attribute(this.getNodes('//storedHU')[0],'lastSaved')
  }

  getRawCodeList(){
    return this.getNodes('//storedHU/links/objectSegmentLinks/codings/iLink')
  }

  extractDocuments() {
    for (let rawDoc of this.getRawDocuments()) {
      let processedDoc = this.processRawDoc(rawDoc)
      this._documents[processedDoc.id] = new AtlasItems.Document(processedDoc)

    }

  }

  extractQuotes(){
    for (let rawDoc of this.getRawDocuments()) {
      this.extractQuotesFromRawDocument(rawDoc)
    }
  }

  extractCodes(){
    for(let rawCode of this.getRawCodes()){
      let processedCode = this.processRawCode(rawCode)
      this._codes[processedCode.id] = new AtlasItems.Code(processedCode)
    }
  }

  extractQuotesFromRawDocument(rawDoc){
    let processedDoc = this.processRawDoc(rawDoc)

    let quotesFromDoc = this.rawQuotationsFromRawDoc(rawDoc)
    if (quotesFromDoc) {
      for (let i = 0; i < quotesFromDoc.length; i++) {
        let quote = quotesFromDoc[i]
        let processedQuote = this.processRawQuote(quote);
        processedQuote['document'] = this._documents[processedDoc.id]
        let quoteItem = new AtlasItems.Quote(processedQuote)
        this._quotations[processedQuote.id] = quoteItem
        this._documents[processedDoc.id].addQuote(quoteItem)
      }
    }
  }

  processRawQuote(quote){
    let loc = parseStringAssignments(attribute(quote, 'loc'))
    return {
      id: attribute(quote, 'id'),
      name: attribute(quote, 'name'),
      location: loc
    }
  }

  processRawCode(code){
    return {
      id: attribute(code, 'id'),
      name: attribute(code, 'name'),
      author: attribute(code, 'au')
    }
  }

  processRawDoc(doc){
    return {
      id: attribute(doc, 'id'),
      name: attribute(doc, 'name'),
      author: attribute(doc, 'au')
    }
  }

  getRawDocuments () {
    return this.getNodes('//storedHU/primDocs/primDoc')
  }


  getRawCodes(){
    return this.getNodes('//storedHU/codes/code')
  }

  rawQuotationsFromRawDoc(rawDoc){
    let rawDocs = rawDoc.getElementsByTagName("q")
    return rawDocs.length > 0 ? rawDocs : null
  }

  getNodes (path) {
    return xpath.select(path, this._xmlDoc)
  }

  getProject(){
    return this._project
  }
}

function parseStringAssignments(string){
  let keyValueList = string.split(" ").map((assignment)=>{
    return assignment.split("=");
  });

  let data = {};
  for(let pair of keyValueList){
    data[pair[0]] = pair[1];
  }

  return data;
}

function attribute(node, attr){
  let attribute = node.getAttributeNode(attr)
  if(attribute){
    return attribute.nodeValue
  }
  return null
}
