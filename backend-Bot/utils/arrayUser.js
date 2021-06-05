const fillWithUsers = (array)=>{
    const ArrayUser=[];
    array.forEach(index=>{   
            ArrayUser.push({
                nome:index[0],
                number1:index[1],
                number2:index[2],
                number3:index[3]
            });
    });
    return ArrayUser;
}

module.exports = {fillWithUsers}