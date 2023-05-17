import Image from "next/image"

interface IcustomImageProps {
    path: string
}

const CustomImage = ({ path }: IcustomImageProps) => {
   return <Image
             src={ path }
             width={ 250 }
             height={ 250 }
             alt=''
             priority/>
}

export default CustomImage