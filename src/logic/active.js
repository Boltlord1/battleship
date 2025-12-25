export default function active() {
    let active = true

    const left = {
        check: () => active === true,
        switch: () => active = false
    }
    const right = {
        check: () => active === false,
        switch: () => active = true
    }

    return { left, right }
}