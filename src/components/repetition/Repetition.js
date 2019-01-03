import {getKey} from './utils'

export default (keyName) => {
  return {
    name: 'repetition',
    data: () => {
      return {
      }
    },
    created () {
      this.cache = new Map()   // 缓存每个打开的页面的实例
    },
    render () {
      const vnode = this.$slots.default ? this.$slots.default[0] :null
      if (vnode) {
        vnode.key = vnode.key || (vnode.isComment ? 'comment' : vnode.tag)
        const key = getKey(this.$route, keyName)
        if (vnode.key.indexOf(key) === -1) {
          vnode.key = `repetition-${key}-${vnode.key}`
        }
        if (this.cache.has(key)) {  // 如果cache里面已经保存了需要打开的页面，那么就直接将cache里面保存的实例赋给当前的vnode
          vnode.componentInstance = this.cache.get(key).componentInstance
          let visiteds = this.$store.state.visitedView.map(item => {
            return getKey(item.route, keyName)
          })
          for (let cacheKey of this.cache.keys()) {  // 这里是我自己项目中需要的，因为要用到导航条
            if (visiteds.indexOf(cacheKey) === -1) {
              this.cache.get(cacheKey).componentInstance.$destroy()
              this.cache.delete(cacheKey)
              break
            }
          }
        } else {   // 如果cache里面没有需要打开的页面，将当前vnode存到cache，
          this.cache.set(key, vnode)
          this.$nextTick(() => {
            let route = this.$route
            console.log(vnode)
            this.$store.commit('addViews', {
              title: route.meta.title + vnode.componentInstance.listId,
              route: {
                name: route.name,
                path: route.path,
                fullPath: route.fullPath,
                query: route.query
              }
            })
          })
        }
        vnode.data.keepAlive = true
      } else {
        if (this.$store.state.visitedView.length === 0 && this.cache.size) {
          let key0 = [...this.cache.keys()]
          this.cache.get(key0[0]).componentInstance.$destroy()
          this.cache.delete(key0[0])
        }
      }
      return vnode
    }
  }
}
