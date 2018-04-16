import { Steps, Button, message ,List,Radio} from 'antd';
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import styleless from './style.less'

const Step = Steps.Step;

const _steps = (fun)=>{ 
  return [{
  title: '选择映像',
  content: (<Step1  osSelect={fun}   />),
}, {
  title: '选择配置',
  content: (<Step2 />),
},
{
  title: '基本设置',
  content: (<Step3 />),
}
];
}

export default class StepForm extends React.Component {
  constructor(props) {
    if (props==null){
      props={}
    }
    super(props);
    this.state = {
      current: 0,
      Os:-1
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  step1(id){
   alert(id);
  }

  render() {
    const { current } = this.state;
      const steps = _steps((id)=>{
                   this.step1(id);
      });

    return (
      <div style={{background:"white",height:600}}>
        <Steps current={current}>
        
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div className="steps-action" >
          {
            this.state.current === steps.length - 1
            &&
            <Button  style={{float:"right"}} type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{float:"left"}} style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
          }
          {
            this.state.current < steps.length - 1
            &&
            <Button style={{float:"right"}} type="primary" onClick={() => this.next()}>下一步</Button>
          }
        </div>
      </div>
    );
  }
}
