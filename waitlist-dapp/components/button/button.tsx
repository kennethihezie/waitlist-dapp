import { IButtonProps } from "../interfaces/button-interface"


const Button = ({text, onclick}: IButtonProps) => {
   return <button className="p-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white" onClick={ onclick }>{ text }</button>
}

export default Button