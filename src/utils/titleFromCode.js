
export default function titleFromCode(code) {
  return code.trim().split("\n")[0].replace(/[#\/*]*/g, "").substring(0, 50)
}