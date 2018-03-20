export function SetProperties (custom, properties) {
  if (typeof custom === "object") {
    for (let prop in custom) {
      if (properties.hasOwnProperty(prop)) {
        properties[prop] = custom[prop]
      }
    }
  }
  return properties
}
