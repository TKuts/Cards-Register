export default class Input {
    constructor({type, classes, id, name}){
        this.type = type,
        this.classes = classes,
        this.id = id,
        this.name = name
    }


    render(){
        
        let input = document.createElement('input');
        input.classList.add(this.classes);
        input.id = this.id;
        input.type = this.type;

        let label = document.createElement('label');
        label.classList.add("form-label");
        label.setAttribute("for", this.id);
        label.innerText = this.name;
             
       
        return {label, input};
    }
}
