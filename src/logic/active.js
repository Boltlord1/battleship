export default function active() {
    let active = true

    const left = {
        check: () => active === false,
        switch: () => active = true,
        win: () => active = null
    }

    const right = {
        check: () => active === true,
        switch: () => active = false,
        win: () => active = null
    }

    return { left, right }
}