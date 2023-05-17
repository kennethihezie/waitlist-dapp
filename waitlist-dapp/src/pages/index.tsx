import { Component, ReactNode } from "react"
import Button from "../../components/button/button"
import Card from "../../components/card/card"
import Content from "../../components/content/content"
import CustomImage from "../../components/image/image"

interface IProps {

}

interface IState {

}

export default class HomePage extends Component<IProps, IState> {
    constructor(props: IProps) {
      super(props)
    }

    joinEthereumWaitList = () => {
      return true
    }

    joinStacksWaitList = () => {
      return true
    }


    render(): ReactNode {
      return (
        <Card>
          <Content>

          <Button
            text="Join the ethereum waitlist"
            onclick={ this.joinEthereumWaitList }/>

          <Button
            text="Join the stacks waitlist"
            onclick={ this.joinStacksWaitList }/>

          </Content>

           <CustomImage
           path="images/crypto-devs.svg"/>
        </Card>
      )
    }
}