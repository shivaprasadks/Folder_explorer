export const onScrollBottom = (callback: () => void) => {
    window.onscroll = () => {
        if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
        ) {
        callback();
        }
    };
}

export const onScrollSide = (callback: () => void) => {
    window.onscroll = () => {
        if (
        window.innerHeight + document.documentElement.scrollLeft >=
        document.documentElement.offsetWidth
        ) {
        callback();
        }
    };
}