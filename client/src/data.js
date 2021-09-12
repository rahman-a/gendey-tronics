const gallery = [];

[...Array(15)].forEach((img, idx) => {
    const num = idx +1;
    if(num === 9 || num === 15){
        gallery.push({
            id:idx+1,
            name:'imageNumber'+num,
            src:'gal-' + num + '.png'
        })
    }else {
        gallery.push({
            id:idx+1,
            name:'imageNumber'+num,
            src:'gal-' + num + '.jpg'
        })

    }
});

export {gallery}