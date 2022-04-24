import { v4 as uuidv4 } from 'uuid'

const mappingProducts = (products) => {
  const allProducts = []
  const types = new Set()

  products.forEach((product) => types.add(product.type.toLocaleLowerCase()))

  for (let key of types) {
    const productsOfType = products.filter(
      (product) => product.type.toLocaleLowerCase() === key
    )
    allProducts.push({
      _id: uuidv4(),
      title: key,
      cards: productsOfType,
    })
  }

  return allProducts
}

export default mappingProducts
