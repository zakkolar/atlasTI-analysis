/* eslint-disable */
import {SetProperties} from "./Helpers";

export class Document {
  constructor() {
    let props = SetProperties(arguments[0], {
      id: null,
      name: null,
      author: null
    })

    this.id = props.id
    this.name = props.name
    this.author = props.author

    this.quotes = []

  }

  addQuote(quote){
    this.quotes.push(quote)
  }

  hasCodeWithId(quoteId){
    for(let quote of this.quotes){
      if(quote.hasCodeWithId(quoteId)){
        return true;
      }
    }
    return false;
  }

  hasCodeWithIds(quoteIds){
    for(let quoteId of quoteIds){
      if(this.hasCodeWithId(quoteId)){
        return true;
      }
    }
    return false;
  }

}

export class Code {
  constructor() {
    let props = SetProperties(arguments[0], {
      id: null,
      name: null,
      author: null
    })

    this.id = props.id
    this.name = props.name
    this.author = props.author

    this.quotes = []

  }

  addQuote(quote) {
    this.quotes.push(quote)
  }

}

export class Quote {
  constructor() {
    let props = SetProperties(arguments[0], {
      id: null,
      name: null,
      location: {},
      document: null
    })

    this.id = props.id
    this.name = props.name
    this.location = props.location
    this.document = props.document


    this.codes = []

  }

  addCode(code) {
    this.codes.push(code)
  }

  hasCodeWithId(codeId){
    for(let code of this.codes){
      if(code.id===codeId){
        return true;
      }
    }
    return false;
  }

  hasCodeWithIds(codeIds){
    for(let codeId of codeIds){
      if(this.hasCodeWithId(codeId)){
        return true;
      }
    }
    return false;
  }
}

