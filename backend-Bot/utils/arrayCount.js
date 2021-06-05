const resultCount = (array,nome)=>{
    let contador=2,instri=1;
    array.forEach(index=>{
        contador++;
        if(index.nome == nome){
            instri = contador-1;        
        }
    });
    return {contador,instri};
}

module.exports = {resultCount}