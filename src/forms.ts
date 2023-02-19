export function formData(form: HTMLFormElement){
    const input = form.querySelectorAll('input')
    let values : {[prop:string]:string} = {};
    input.forEach(  
        i => {values[i.id] = i.value}
    );
    return values
}

