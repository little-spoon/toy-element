// 用于 vue plugin 安装的一系列操作
import type { App, Plugin } from 'vue'
import { each } from "lodash-es"

type SFCWithInstall<T> = T & Plugin

/**
 * 创建一个安装器函数，用于批量安装插件
 * 
 * @param components 插件数组，其中每个插件是一个符合 Plugin 接口的对象
 * @returns 返回一个插件安装函数，该函数可以接受一个 App 应用实例作为参数，
 * 并依次调用应用实例的 use 方法来安装所有的插件
 * 
 * 使用场景：
 * 在一些前端框架如 Vue 中，我们可能需要为应用安装多个插件。为了简化这一过程，
 * 我们可以使用该函数来创建一个安装器。这个安装器在被调用时，会自动遍历所有传入的插件并安装它们，
 * 从而避免了手动逐个调用 app.use 方法来安装插件的繁琐过程。
 */
export function makeInstaller(components: Plugin[]) {
    // 定义一个内部安装函数，该函数接受一个 App 应用实例作为参数
    const installer = (app: App) => {
        // 使用 Array 的 each 方法（这里实际上是 map、forEach 等的别称，但具体实现不在此处）来遍历所有插件，并调用 app 的 use 方法来安装每个插件
        // 这里体现了函数式编程的思想，将安装插件的操作抽象为数据遍历处理
        each(components, (c) => app.use(c))
    }
    // 将内部安装函数作为插件返回，使得它能够被应用实例的 use 方法接受
    return installer as Plugin
}



/**
 * withInstall是一个高阶函数，用于扩展Vue组件，使其具有安装功能。
 * 这对于按需引入组件非常有用，因为它允许像`import { Button } from 'some-library'`这样直接引入单个组件，
 * 而不是整个库。这个函数的工作原理是通过给组件添加一个`install`方法来实现的。
 * 
 * @param component - 要扩展的Vue组件。
 * @returns 返回扩展了install方法的组件。
 */
export function withInstall<T>(component: T) {
    // 将组件转换为具有install方法的类型，以允许其被安装到Vue应用中。
    (component as SFCWithInstall<T>).install = (app: App) => {
        // 获取组件的名称，用于在Vue应用中注册组件时标识它。
        const name = (component as any).name
        // 将组件注册到Vue应用中，使其可以在该应用的上下文中被使用。
        app.component(name, component as Plugin)
    }
    // 返回原始组件，但现在它具有install方法，允许其被安装到Vue应用中。
    return component as SFCWithInstall<T>
}
