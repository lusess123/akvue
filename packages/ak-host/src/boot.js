import akvue from './.akvue'
export const   load =  async (a) => {
 
           await akvue();

           a();
}