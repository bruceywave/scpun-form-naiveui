import mitt from 'mitt'

const instance = mitt()
const eventBus = {
    $on: instance.on,
    $off: instance.off,
    $emit: instance.emit

}
export default eventBus
