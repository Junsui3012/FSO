
const cout = (...param) => {
  if (process.env.NODE_ENV !== 'test') console.log(...param)
}

const cerr = (...param) => {
  if (process.env.NODE_ENV !== 'test') console.error(...param)
}

const errobj = (status, message) => {
  return { status, message }
}

export {
  cout,
  cerr,
  errobj,
}