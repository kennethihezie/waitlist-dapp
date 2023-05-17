
const Card = ({ children }: any) => {
    return (
       <div className="flex flex-col-reverse md:flex-row justify-between items-center rounded-lg p-10 shadow-md bg-white space-y-8 md:space-x-12">
          { children }
       </div>
    )
}

export default Card