
let start_seconds = new Date()


function get_seconds(time: Date){
    return time.getSeconds()+ time.getMilliseconds()/1000
}

export function get_t() {
    return get_seconds(new Date()) - get_seconds(start_seconds)
}
