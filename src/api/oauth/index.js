import { get } from '../../utils/request'

export function testGet(param) {
    const  url = 'common/test'
    return get(
        url,
        param
    )
}