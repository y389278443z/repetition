let routers = []

if (window.sessionStorage.WX_REPETITION) {
  routers = JSON.parse(window.sessionStorage.WX_REPETITION)
}

export default routers
