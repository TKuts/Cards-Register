export default class Select {
    constructor({classes, id, name, options}){
       
        this.classes = classes,// only one class
        this.id = id,
        this.name = name
        this.options = options
    }


    render(){
        
        let select = document.createElement('select');
        select.classList.add(this.classes);
        select.id = this.id;
        select.name = this.name;

        let label = document.createElement('label');
        label.classList.add("form-label");
        label.setAttribute("for", this.id);
        label.innerText = this.name;
        
        let elementOption = document.createElement('option');
        elementOption.setAttribute("value", "default");
        elementOption.innerHTML = "...";
        select.append(elementOption);

        this.options.forEach(option => {
            let elementOption = document.createElement('option');
            elementOption.setAttribute("value", option);
            elementOption.innerHTML = option;
            select.append(elementOption);
           
            
        });
        // console.log(select)

                
        return {label, select};
    }
}

