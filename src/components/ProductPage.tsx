import { useSelector } from "react-redux/es/exports";
import type { SwapOptions } from "../states";

export default function ProductsPage() {
    const selectedPage = useSelector<{ type: SwapOptions }, SwapOptions>(state => state.type);
    console.log("New products page is", selectedPage)
    return (
        <>
        
        </>
    )
}
