import { render } from "preact"
import { TutoBoxOptions } from "../../types/tuto.type"
import { TutoBoxType } from "../../types/tutobox.type"
import Main from "./Main"



function App(options: TutoBoxOptions, tutobox: TutoBoxType) {
    const rootName = "tuto-box-root-element"
    let root = document.getElementById(rootName)
    if (!root) {
        // create tutobox wrapper
        root = document.createElement("div")
        root.id = rootName
        root.classList.add("tbox")
        document.body.appendChild(root)



        render(
            <Main tutobox={tutobox} {...options} />
            , root)

    }
    return !!root
}

export default App