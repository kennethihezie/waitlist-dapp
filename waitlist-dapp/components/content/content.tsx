import Button from "../button/button"
import { IButtonProps } from "../interfaces/button-interface"

interface IContent {
    count: string
    children: any
    title: string
    subTitle: string
}

const Content = ({ count, children, title, subTitle }: IContent) => {
    return (
        <div className="flex flex-col space-y-2 mt-8 md:mt-0">
            <p className="text-2xl font-bold">{ title }</p>
            <p className="text-sm">{ subTitle }</p>
            <p className="text-sm">{`${count} has already joined the waitlist`}</p>
            <br />
            
           
            { children }
        </div>
    )
}

export default Content