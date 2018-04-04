


export const loadSys = async function () {

    //await loadListForm();
    // return new Promise((a, b) => {
    //     //     require.ensure([],function (require) {
    //     //         require("app");
    //     //         require("app/listpage/ListForm");
    //     //          a();
    //     //  });
    // });
   return  Promise.all(_BootStrapTasks);

}



 let _BootStrapTasks: Promise<void>[] = [];

 export const addTask = (p :Promise<void>)=>{
     _BootStrapTasks.push(p);
 }


