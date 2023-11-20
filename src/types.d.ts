type PriceDiscount = {
    from: number,
    to: number
}

interface OneItem {
    img: string,
    name: string,
    spec?: unknown,
    price: PriceDiscount | number,
}

interface FilterMachUp {
    name: string,
    options: string[],
    version: "one" | "multiple"
}

type SelectedBikeCategories = {
    name: string
}[];