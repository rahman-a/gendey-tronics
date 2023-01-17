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


const products = {
    immo :{
        header:'immo off files',
        cards : [
            {
                _id:1,
                image:'images/immo/immo-1.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/immo'
            },
            {
                _id:2,
                image:'images/immo/immo-2.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/immo'
            },
            {
                _id:3,
                image:'images/immo/immo-3.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/immo'
            },
            {
                _id:4,
                image:'images/immo/immo-4.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/immo'
            },
            {
                _id:5,
                image:'images/immo/immo-1.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/immo'
            },
            {
                _id:6,
                image:'images/immo/immo-3.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/immo'
            },
            {
                _id:7,
                image:'images/immo/immo-2.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/immo'
            },
            {
                _id:8,
                image:'images/immo/immo-3.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/immo'
            }
        ]
    },
    tunning: {
        header: 'tunning files',
        cards:[
            {
                _id:1,
                image:'images/tunning/tunning-1.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/tunning'
            },
            {
                _id:2,
                image:'images/tunning/tunning-1.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/tunning'
            },
            {
                _id:3,
                image:'images/tunning/tunning-1.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/tunning'
            },
            {
                _id:4,
                image:'images/tunning/tunning-1.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/tunning'
            },
            {
                _id:5,
                image:'images/tunning/tunning-1.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/tunning'
            }
        ]
    },
    hardware: {
        header:'hardware tools',
        cards:[
            {
                _id:1,
                image:'images/hardware/hard-1.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/hardware'
            },
            {
                _id:2,
                image:'images/hardware/hard-2.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/hardware'
            },
            {
                _id:3,
                image:'images/hardware/hard-3.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/hardware'
            },
            {
                _id:4,
                image:'images/hardware/hard-4.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/hardware'
            },
            {
                _id:5,
                image:'images/hardware/hard-1.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/tunning'
            }
        ]
    },
    airbag: {
        header:'airbag clear crash',
        position:'down',
        cards:[
            {
                _id:1,
                image:'images/hardware/air-1.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/hardware'
            },
            {
                _id:2,
                image:'images/hardware/air-2.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/hardware'
            },
            {
                _id:3,
                image:'images/hardware/air-1.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/hardware'
            },
            {
                _id:4,
                image:'images/hardware/air-2.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/hardware'
            },
            {
                _id:5,
                image:'images/hardware/air-3.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/tunning'
            }
        ]
    },
    ecu: {
        header:'edu programmers',
        cards:[
            {
                _id:1,
                image:'images/hardware/air-1.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/hardware'
            },
            {
                _id:2,
                image:'images/hardware/air-2.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/hardware'
            },
            {
                _id:3,
                image:'images/hardware/air-3.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/hardware'
            },
            {
                _id:4,
                image:'images/hardware/air-1.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/hardware'
            },
            {
                _id:5,
                image:'images/hardware/air-2.png',
                price:24.99,
                name:'كيا وهيواندى إيمو أوف SIM2K-250/251/253/258/259',
                target:'/tunning'
            }
        ]
    }
}

export {gallery, products}