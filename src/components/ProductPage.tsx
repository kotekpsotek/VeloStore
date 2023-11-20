import { useSelector } from "react-redux/es/exports";
import type { SwapOptions } from "../states";
import { Card, Label, Checkbox, TextInput, Select, Pagination } from "flowbite-react";
import { useEffect, useId, useReducer, useRef, useState } from "react";
import { Slider } from "@mui/material";
import React from "react";
import BikeWidget, { BikeWidgetProps } from "./BikeWidget";

function UpperSidePersonalized({state}: {state: SwapOptions}) {
    const versions = [
        {
            name: "Bikes",
            desc: "Match up bike with the best adjustment to you"
        },
        {
            name: "Bikes on Sale",
            desc: "Utilize discount to buy your dreamed bike. Our suit of sale bikes is extensive, for sure you find something"
        },
        {
            name: "Black Week",
            desc: "Almost every bike was got firm discount"
        }
    ]

    let searchBy: string;
    switch (state) {
        case "Black Week":
            searchBy = "Black Week";
        break;

        case "Products":
            searchBy = "Bikes";
        break;

        case "Sales":
            searchBy = "Bikes on Sale";
        break;

        default:
            searchBy = "Bikes"
    }
    const { name, desc } = versions.find(v => v.name == searchBy) as typeof versions[0];

    return (
        <div className="text-black">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-md">{desc}</p>
        </div>
    )
}

function PageMarkup({state}: {state: SwapOptions}) {
    const [price, setPrice] = useState([200, 57000]);
    const [categoriesBikes, setCategories] = useState<string[]>([])
    const [brands, setBrands] = useState<string[]>([]);
    const [gender, setGender] = useState<"male" | "female" | false>(false);
    const [sort, setSort] = useState<"Newset" | "Oldest" | "Most Viewed" | "Price Ascending" | "Price Descending" | "Random">("Random");
    const [page, changePage] = useState(1);
    const pagesTotaly = 5;

    const bikesCategories: { name: string, list: OneItem[] }[] = [
        {
            name: "MTB",
            list: [
                {
                    img: "https://sprint-rowery.pl/media/catalog/product/cache/2cf98570d9f614fe7b8ae8291728e2d9/r/o/rower-gorski-marin-team-marin-1-czarny-1_1.webp",
                    name: "Marin Team Marin 1",
                    price: 990,
                }
            ]
        },
        {
            name: "Road",
            list: []
        },
        {
            name: "Gravel",
            list: []
        },
        {
            name: "Cross Bikes",
            list: []
        },
        {
            name: "City",
            list: []
        },
        {
            name: "Travel",
            list: []
        }
    ]

    const bikesList: BikeWidgetProps[] = [
        {
            model: "normal",
            name: "Giant TCR Advanced Pro 2 Disc",
            img: "https://sprint-rowery.pl/media/catalog/product/cache/2cf98570d9f614fe7b8ae8291728e2d9/m/y/my22tcradvancedpro2disc_colorastarrynight_3.webp",
            price: 4500
        },
        {
            model: "normal",
            name: "Giant TCR Advanced SL Disc 0 RED 2022",
            img: "https://sprint-rowery.pl/media/catalog/product/cache/2cf98570d9f614fe7b8ae8291728e2d9/r/o/rower-szosowy-giant-tcr-advanced-sl-disc-0-red-2022_1.webp",
            price: 17_345
        },
        {
            model: "normal",
            name: "Giant Propel Advanced Pro 1",
            img: "https://sprint-rowery.pl/media/catalog/product/cache/2cf98570d9f614fe7b8ae8291728e2d9/r/o/rower-szosowy-giant-propel-advanced-pro-1-czarny-matowy-1_4.webp",
            price: 8300
        },
        {
            model: "normal",
            name: "Trek Domane SL7 Disc 2023",
            img: "https://sprint-rowery.pl/media/catalog/product/cache/2cf98570d9f614fe7b8ae8291728e2d9/r/o/rower-szosowy-trek-domane-sl-7-etap-gen-4-2023-szary-01_1.webp",
            price: 9229
        },
        {
            model: "normal",
            name: "Trek Madone SLR 6 AXS Gen 7",
            img: "https://sprint-rowery.pl/media/catalog/product/cache/2cf98570d9f614fe7b8ae8291728e2d9/r/o/rower-szosowy-trek-madone-slr-6-axs-gen-7-czarny-matowy-1_7.webp",
            price: 22_000
        },
        {
            model: "normal",
            name: "Cannondale SuperSix EVO Hi-Mod 1",
            img: "https://sprint-rowery.pl/media/catalog/product/cache/2cf98570d9f614fe7b8ae8291728e2d9/r/o/rower-szosowy-cannondale-supersix-evo-hi-mod-1-czarno-srebrny_3.webp",
            price: 45_000
        },
        {
            model: "normal",
            name: "Kross Vento DSC 5.0",
            img: "https://sprint-rowery.pl/media/catalog/product/cache/2cf98570d9f614fe7b8ae8291728e2d9/r/o/rower-szosowy-kross-vento-dsc-5-0-srebrny_1__2_1.webp",
            price: 2000
        },
        {
            model: "normal",
            name: "Cannondale System Six Ultegra 2023",
            img: "https://sprint-rowery.pl/media/catalog/product/cache/2cf98570d9f614fe7b8ae8291728e2d9/r/o/rower-szosowy-cannondale-system-six-ultegra-2021-czerwony-01_3.webp",
            price: 10497.58
        }
    ]

    function BikeCategoriesCover() {
        const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ currentTarget: { value } }) => {
            const find = categoriesBikes.findIndex(v => v == value);

            if (find == -1) {
                // When desn't exists
                setCategories([...categoriesBikes, value])
            }
            else {
                // When does
                categoriesBikes.splice(find, 1);
                setCategories([...categoriesBikes]);
            }
        } 
        
        return (
            <Card className="flex flex-col gap-y-1 w-56">
                <h3 className="font-bold mb-2">Categories</h3>
                {bikesCategories.map(({ name }) => 
                    <div className="flex items-center gap-2" key={useId()}>
                        <Checkbox id="united-state" name={name} value={name} checked={categoriesBikes.includes(name)} multiple onChange={handleChange}/>
                        <Label htmlFor="united-state" className="font-medium">{name}</Label>
                    </div>
                )}
            </Card>
        )
    }

    /** Expand to Filters html snippest */
    function Filters() {
        const barnds = [
            "Trek",
            "Giant",
            "Cannondale",
            "Merida",
            "Scott",
            "Kross",
            "Romet"
        ];
        const genders = ["male", "female"];
        
        function PickOption({filter}: {filter:FilterMachUp}) {
            /** For only one option avaiable -> unselect other selected */
            const handleChangeForOnlyOne = function(involvedFor: string) {
                return (({ currentTarget }) => {
                    // Check only one functionality
                    if (filter.version == "one" && currentTarget.checked) {
                        const othersList = currentTarget.parentElement?.parentElement;
                        for (const check of othersList?.children || []) {
                            const inputEl = check.querySelector("input:first-of-type")!;
                            const attr = inputEl.getAttribute("data-for"); // Attribute which made this unique
                            
                            if (attr != involvedFor) {
                                (inputEl as HTMLInputElement).checked = false;
                            }
                        }
                    }
                }) satisfies React.ChangeEventHandler<HTMLInputElement>
            };

            const handleClick: React.MouseEventHandler<HTMLInputElement> = ({ currentTarget }) => {
                const dt = currentTarget.getAttribute("data-for")!;
                switch(filter.name) {
                    case "Brands":
                        const checked = currentTarget.checked;
                        if (checked && !brands.includes(dt)) {
                            setBrands([...brands, dt]);
                        }
                        else if (!checked && brands.includes(dt)) {
                            const sp = brands.splice(brands.findIndex(v => v == dt), 1);
                            setBrands([...brands])
                        }
                    break;

                    case "Gender":
                        if (dt != gender) {
                            setGender(dt as any);
                        }
                        else setGender(false)
                    break;
                }
            }

            const isChecked = (opt: string) => {
                switch(filter.name) {
                    case "Brands":
                        return brands.includes(opt)

                    case "Gender":
                        return gender == opt
                }
            }

            return (
                <details open={true} className="details-filter">
                    <summary>{filter.name}</summary>
                    <div>
                        {filter.options.map(opt => (
                            <div className="flex items-center gap-2" key={useId()}>
                                <Checkbox id="accept" name={filter.version == "multiple" ? opt : filter.name} data-for={opt} checked={isChecked(opt)} onChange={handleChangeForOnlyOne(opt)} onClick={handleClick}/>
                                <Label htmlFor="accept" className="flex">
                                    {opt}
                                </Label>
                            </div>
                        ))}
                    </div>
                </details>
            )
        }

        function Price() {
            const handleChange = (tg: "from" | "to") => {
                return (({ currentTarget: { value } }) => {
                    switch(tg) {
                        case "from":
                            setPrice([Number(value), price[1]]);
                        break;

                        case "to":
                            setPrice([price[0], Number(value)]);
                        break
                    }
                }) satisfies React.FocusEventHandler<HTMLInputElement>
            }
            
            return (
                <details open={true} className="details-filter">
                    <summary>Price</summary>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password2" value="From" />
                        </div>
                        <TextInput id="price-from" type="number" min={200} max={57000} defaultValue={price[0]} onBlur={handleChange("from")} required shadow/>
                    </div>                        
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password2" value="To" />
                        </div>
                        <TextInput id="price-to" type="number" min={price[0]} max={price[1]} defaultValue={price[1]} onBlur={handleChange("to")} required shadow/>
                    </div>                        
                </details>
            )
        }

        return (
            <Card className="flex flex-col gap-y-1 w-56">
                <h3 className="font-bold mb-2">Filters</h3>
                <PickOption filter={{ name: "Brands", options: barnds, version: "multiple" }}/>
                <PickOption filter={{ name: "Gender", options: genders, version: "one" }}/>
                <Price/>
            </Card>
        )
    }
    
    /** Pagination functionality */
    function Pages() {
        const handleChangePage = (pg: number) => changePage(pg);
        
        return (
            <>
                <div className="flex justify-center pb-5">
                    <Pagination currentPage={page} totalPages={pagesTotaly} showIcons onPageChange={handleChangePage}/>
                </div>
            </>
        )
    }

    /** handle change in sorting items */
    const handleChangeSort: React.ChangeEventHandler<HTMLSelectElement> = ({ currentTarget: { value } }) => {
        setSort(value as any);
    }

    return (
        <>
            <div className="flex flex-col gap-y-2 w-screen h-screen p-8" style={{ backgroundColor: "aliceblue" }}>
                <UpperSidePersonalized state={state}/>
                <div className="flex gap-x-2 text-black">
                    <div className="utils flex flex-col gap-y-2">
                        <BikeCategoriesCover/>
                        <Filters/>
                    </div>
                    <div className="items w-screen">
                        <div  id="upper-stripe" className="flex justify-between p-2 items-center">
                            <p className="font-semibold">We found (<span className="font-bold text-emerald-400">{8}</span>) products</p>
                            <Select id="sort-by" placeholder="Sort by" onChange={handleChangeSort} required>
                                <option value="Random" selected>Random</option>
                                <option value="Newest">Newest</option>
                                <option value="Oldest">Oldest</option>
                                <option value={"Most Viewed"}>Most Viewed</option>
                                <option value={"Price Ascending"}>Price Ascending</option>
                                <option value={"Price Descending"}>Price Descending</option>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 grid-rows-4 gap-3">
                            {bikesList.map(bike => {
                                return (
                                    <BikeWidget {...bike}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Pages/>
            </div>
        </>
    )
}

export default function ProductsPage() {
    const selectedPage = useSelector<{ type: SwapOptions }, SwapOptions>(state => state.type);
    return (
        <>
            {selectedPage != null ? <PageMarkup state={selectedPage}/> : null};
        </>
    )
}
