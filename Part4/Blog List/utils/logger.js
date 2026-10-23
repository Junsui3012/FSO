
const cout = (param) => {
  console.log(param)
}

const cerr = (param) => {
  console.error(param)
}

const errobj = (status, message) => {
  return { status, message }
}

export {
  cout,
  cerr,
  errobj,
}