
export function focus(input) {
    // console.log(input.classList);
    input.addEventListener("click", () => {
        const error = document.querySelector(`.${input.classList}.error`);
        if (error) {
            error.remove();
        }
    })

}