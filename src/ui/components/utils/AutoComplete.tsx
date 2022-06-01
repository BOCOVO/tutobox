import { useCallback, useEffect, useState } from "preact/hooks"
import SearchOutline from "../../icons/SearchOutline"

type AutoCompleteProps = {
    placeholder: string,
    options: string[],
    onSelect: (option: string) => void,
    onClear: () => void,
    emptyText: string
}

const AutoComplete = ({ placeholder, options, onSelect, onClear, emptyText }: AutoCompleteProps) => {

    const [open, setOpen] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [suggestions, setSuggestion] = useState<string[]>([])

    const onTextChange = (e: any) => {
        const value = e.target.value
        setSearchText(value)
        if (!value) {
            onClear()
        }
    }

    const onOptionSelect = (option: string) => {
        setOpen(false)
        setSearchText(option)
        onSelect(option)
    }

    const closeDropdown = useCallback(
        () => setOpen(false),
        []
    )

    useEffect(() => {
        const result = options.filter(option => {
            return option.toLowerCase().includes(searchText.toLowerCase())
        })
        setSuggestion(result)
    }, [searchText])

    useEffect(() => {
        document.body.addEventListener("click", closeDropdown)
        return () => {
            document.body.removeEventListener("click", closeDropdown)
        }
    }, [])



    return (
        <div
            className="tbox-auto-complete-wrapper tbox-relative">
            <div className=" tbox-w-full tbox-px-5 tbox-py-3 tbox-absolute">
                <div
                    onClick={e => e.stopPropagation()} // 
                    tabIndex={-1}
                    onFocus={() => setOpen(true)}
                    className={` tbox-w-full tbox-auto-complete  tbox-px-3 ${open ? "open" : ""}`}>
                    <div className=" tbox-flex tbox-items-center tbox-py-1">
                        <input
                            onFocus={() => setOpen(true)}
                            type="search"
                            role="combobox"
                            aria-autocomplete="list"
                            aria-expanded={!!suggestions.length}
                            value={searchText}
                            onInput={onTextChange}
                            className=" tbox-p-1 focus:tbox-outline-none tbox-border-none tbox-w-full"
                            placeholder={placeholder}
                            aria-label={placeholder}
                        />
                        <SearchOutline className=" hover:tbox-bg-very-light-primary tbox-rounded-md tbox-p-2 tbox-cursor-pointer tbox-fill-primary" />
                    </div>
                    {open &&
                        <>
                            <div className="tbox-divider"></div>
                            {suggestions.length
                                ? <ul
                                    className=" tbox-auto-complete-list tbox-py-2 ">
                                    {suggestions.map((suggestion) => (
                                        <li
                                            key={suggestion}
                                            onClick={() => onOptionSelect(suggestion)}
                                            className=" hover:tbox-text-primary tbox-cursor-pointer tbox-p-1">
                                            {suggestion}
                                        </li>
                                    ))
                                    }
                                </ul>
                                : <p className=" tbox-font-bold tbox-text-center tbox-py-4 ">{emptyText}</p>
                            }
                        </>
                    }
                </div>
            </div>
        </div>

    )
}

export default AutoComplete