export const LoadFileFromInput = function (input, callback) {
  let file = input.files[0]
  const reader = new FileReader()
  reader.readAsText(file)
  reader.addEventListener('load', function () {
    callback(reader.result)
  })
}
