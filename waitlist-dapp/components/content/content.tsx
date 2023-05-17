import Button from "../button/button"
import { IButtonProps } from "../interfaces/button-interface"


const Content = ({ children }: any) => {
    return (
        <div className="flex flex-col space-y-2 mt-8 md:mt-0">
            <p className="text-2xl font-bold">Welcome To Crypto Dev!</p>
            <p className="text-sm">Its an nft collection for developers in Crypto</p>
            <p className="text-sm">3 has already joined the waitlist</p>
            <br />
            
           

            { children }
        </div>
    )
}

export default Content