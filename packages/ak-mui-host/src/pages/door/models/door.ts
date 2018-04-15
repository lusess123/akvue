export class DemoVm
{
     Pro1 = "123";
     Pro2 = 123

     setPro(){
             this.Pro2 = this.Pro2 ++  ;
     }
}


export default {
    namespace: 'door',
  
    state: {
      collapsed: false,
      notices: [],
      now :new Date(),
      Vm: new DemoVm()
    }
}

