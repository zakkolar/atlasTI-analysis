/* eslint-disable */
export class Project {

  setQuotations (quotations) {
    this._quotations = quotations
  }

  getQuotations(){
    return this._quotations || null
  }

  setDocuments (documents) {
    this._documents = documents
  }

  getDocuments(){
    return this._documents || null
  }

  setCodes (codes) {
    this._codes = codes
  }

  getCodes () {
    return this._codes
  }

  setTitle (title) {
    this._title = title
  }

  getTitle () {
    return this._title
  }

  setModified (modified) {
    this._modified = modified
  }

  getModified () {
    return this._modified
  }

  getData(){
    return {
      title: this.getTitle(),
      modified: this.getModified(),
      documents: this.getDocuments(),
      quotations: this.getQuotations(),
      codes: this.getCodes()
    }
  }

}
