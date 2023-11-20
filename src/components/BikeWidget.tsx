import { Badge, Card } from "flowbite-react";
import { useId } from "react";

export interface BikeWidgetProps {
    model: "bestseller" | "normal",
    /** Bike nake */
    name: string,
    /** URL with img */
    img: string,
    /** Bike price */
    price: PriceFromTo | number,

}

export interface PriceFromTo {
    from: number,
    to: number
}

export function calculateDiscount({ from, to }: PriceFromTo) {
  return Math.round(100 - (from/to) * 100) * -1;
}

export default function BikeWidget({ model, price, img, name }: BikeWidgetProps) {
    const imageAlt = (() => model == "bestseller" ? "bike bestseller" : "bike image")()
    
    return (
        <Card
            className="relative hover:scale-105 hover:z-10 hover:shadow-xl hover:shadow-slate-500 cursor-pointer"
            imgAlt={imageAlt}
            key={useId()}
        >
            {
                model == "bestseller" ? 
                <div className='absolute p-2 w-full h-fit justify-start top-0 right-0 flex gap-x-2'>
                    <Badge color="pink">Bestseller</Badge>
                    {
                        typeof price == "object"
                        ?
                        <Badge color="success">-{calculateDiscount(price)}%</Badge>
                        :
                        null
                    }
                </div>
                :
                null
            }            
            <div className="flex justify-center">
                <img src={img} alt="" loading='lazy' className='w-52 h-52 object-scale-down'/>
            </div>
            <p className='text-black font-semibold'>{name}</p>
            <div id="prices" className='text-black flex gap-2'>
                    {
                        typeof price == "object"
                        ?
                        <>
                            <p id='actual'>{price.to}&euro;</p>
                            <u id="past" className='line-through'>{price.from}&euro;</u>
                        </>
                        :
                        <>
                            <p className="text-green-500 font-bold">{price}&euro;</p>
                        </>
                    }
            </div>
        </Card>
    );
}