import {v4 as uuidv4} from 'uuid'
const mappingProducts = products => {
    const allProducts = []
    const immoProducts = []
    const airProducts = []
    const tunningProducts = []
    const hardwareProducts = []
    const ecuProgramming = []
    const types = [
        {name:'immo off files', array:immoProducts},
        {name:'tunning files', array:tunningProducts},
        {name:'hardware tools', array:hardwareProducts},
        {name:'air bag clear crash', array:airProducts},
        {name:'ecu programming', array:ecuProgramming},
    ]
    for(const product of products) {
        for(const type of types) {
            if(product.type === type.name) {
                type.array.push(product)
            }
        }
    }
    for(const type of types) {
        if(type.name === 'immo off files') allProducts.push({_id:uuidv4(), title:type.name, cards:immoProducts})
        if(type.name === 'tunning files') allProducts.push({_id:uuidv4(), title:type.name, cards:tunningProducts})
        if(type.name === 'hardware tools') allProducts.push({_id:uuidv4(), title:type.name, cards:hardwareProducts})
        if(type.name === 'air bag clear crash') allProducts.push({_id:uuidv4(), title:type.name, cards:airProducts, position:'down'})
        if(type.name === 'ecu programming') allProducts.push({_id:uuidv4(), title:type.name, cards:ecuProgramming})
    }
    console.log('All Products', products);
    return allProducts
}

export default mappingProducts