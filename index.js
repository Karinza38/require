const nothing = Symbol("nothing")
const cache = {}
module.exports = window[Symbol.for("require")] = async function require(url) {
    if (!Object.keys(cache).includes(url)) {
        const text = await new Promise(
            (resolve, reject) => fetch(url).then((response)=>resolve(response.text())).catch(reject)
        )
        if (typeof module == "undefined") {
            module = {}
        }
        module.exports = nothing
        cache[url] = eval(text)
        if (module.exports !== nothing) {
            cache[url] = module.exports
        }
    }
    return cache[url]
}