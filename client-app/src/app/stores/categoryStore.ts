import agent from "../api/agent";
import { Category } from "../models/category";

export default class CategoryStore {
    categoryRegistry = new Map<string, Category>()
    

    get categories(){
        return Array.from(this.categoryRegistry.values());
    }

    get options(){
        let options: { key: string; text: string; value: string; }[] = []
        this.categoryRegistry.forEach((category) => {
            options.push({key: category.id, text: category.title, value: category.id})
        })
       return options;
    }
    loadCategories = async ()=>{
        try{
            const result = await agent.Categories.list();
            result.forEach(category =>{
                    this.categoryRegistry.set(category.id, category);
                })
        }catch(error){
            console.log(error);
        }

    }



}
