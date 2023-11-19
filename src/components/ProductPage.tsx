import { useSelector } from "react-redux/es/exports";
import type { SwapOptions } from "../states";
import { Card, Label, Radio, Accordion, Checkbox, RangeSlider, TextInput, Select } from "flowbite-react";
import { useId, useState } from "react";
import { Slider } from "@mui/material";
import React from "react";

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

function pageMarkup(state: SwapOptions) {
    const [priceRangeValue, setPriceRange] = React.useState<number[]>([200, 57000]);
    
    const bikesCategories: { name: string, list: OneItem[] }[] = [
        {
            name: "MTB",
            list: []
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

    function BikeCategoriesCover() {
        return (
            <Card className="flex flex-col gap-y-1 w-56">
                <h3 className="font-bold mb-2">Categories</h3>
                {bikesCategories.map(({ name }) => 
                    <div className="flex items-center gap-2" key={useId()}>
                        <Radio id="united-state" name={name} value="USA" multiple/>
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
        const price = {
            from: 200,
            to: 56_000
        }
        const genders = ["male", "female"];
        
        function PickOption({filter}: {filter:FilterMachUp}) {
            /** For only one option avaiable -> unselect other selected */
            const handleChangeForOnlyOne = function(involvedFor: string) {
                return (({ currentTarget }) => {
                    if (currentTarget.checked) {
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
            
            return (
                <>
                    <Accordion.Title>{filter.name}</Accordion.Title>
                    <Accordion.Content>
                        {filter.options.map(opt => (
                            <div className="flex items-center gap-2" key={useId()}>
                                <Checkbox id="accept" name={filter.version == "multiple" ? opt : filter.name} data-for={opt} onChange={filter.version == "one" ? handleChangeForOnlyOne(opt) : () => null}/>
                                <Label htmlFor="accept" className="flex">
                                    {opt}
                                </Label>
                            </div>
                        ))}
                    </Accordion.Content>
                </>
            )
        }

        function Price() {
            return (
                <>
                    <Accordion.Title>Price</Accordion.Title>
                    <Accordion.Content>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password2" value="From" />
                            </div>
                            <TextInput id="password2" type="number" min={price.from} max={price.to} value={price.from} required shadow />
                        </div>                        
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password2" value="To" />
                            </div>
                            <TextInput id="password2" type="number" min={price.from} max={price.to} value={price.to} required shadow />
                        </div>                        
                    </Accordion.Content>
                </>
            )
        }

        return (
            <Card className="flex flex-col gap-y-1 w-56">
                <h3 className="font-bold mb-2">Filters</h3>
                <Accordion>
                    <Accordion.Panel>
                        <PickOption filter={{ name: "Brands", options: barnds, version: "multiple" }}/>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <PickOption filter={{ name: "Gender", options: genders, version: "one" }}/>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Price/>
                    </Accordion.Panel>
                </Accordion>
            </Card>
        )
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
                        <div className="flex justify-between p-2 items-center">
                            <p className="font-semibold">We found (<span className="font-bold text-emerald-400">{4}</span>) products</p>
                            <Select id="sort-by" placeholder="Sort by" required>
                                <option>Popularity</option>
                                <option>Most Viewed</option>
                                <option>Price Ascending</option>
                                <option>Price Descending</option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function ProductsPage() {
    const selectedPage = useSelector<{ type: SwapOptions }, SwapOptions>(state => state.type);
    console.log("New products page is", selectedPage)
    return (
        <>
            {selectedPage != null ? pageMarkup(selectedPage) : null};
        </>
    )
}
