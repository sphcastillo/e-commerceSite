import img1 from './images/product1.jpeg'
import img2 from './images/product2.jpeg'
import img3 from './images/product3.jpeg'
import img4 from './images/product4.jpeg'
import img5 from './images/product5.jpeg'
import img6 from './images/product6.jpeg'

const data = {
    products: [
        {
            _id: "1",
            name: "Better Sweater Fleece Jacket",
            category: "Fleece",
            image: img1,
            price: 139,
            countInStock: 10,
            brand:"Patagonia",
            rating: "4.5",
            numReviews: 245,
            description: "Warm, 100% recycled polyester fleece in a full-zip jacket dyed with a low-impact process that significantly reduces the use of dyestuffs, energy and water compared to conventional dyeing methods. Fair Trade Certified sewn."
        },
        {
            _id: "2",
            name: "Mount Airy Scoop Tank",
            category: "T-Shirts",
            image: img2,
            price: 29,
            countInStock: 20,
            brand:"Patagonia",
            rating: "4",
            numReviews: 26,
            description: "An alternative to traditional synthetics, this linen and polyester tank will help keep you cool in humid conditions. Fair Trade Certified sewn."
        },
        {
            _id: "3",
            name: "Regenerative Pilot Crewneck Sweatshirt",
            category: "Sweatshirts & Hoodies",
            image: img3,
            price: 69,
            countInStock: 5,
            brand:"Patagonia",
            rating: "4.5",
            numReviews: 10,
            description: "Made of 100% Regenerative Organic Certification Pilot Cotton from farms working toward the highest organic standard, which aims to rehabilitate soil, respect animal welfare and improve the lives of farmers. Because healthy soil traps carbon, this growing movement could help stop climate change. Fair Trade Certified sewn."
        },
        {
            _id: "4",
            name: "Garden Island Shorts -4",
            category: "Shorts",
            image: img4,
            price: 65,
            countInStock: 15,
            brand:"Patagonia",
            rating: "4",
            numReviews: 21,
            description: "Hot weather calls for these easy-wearing, breathable hemp/TENCEL lyocell blend shorts."
        },
        {
            _id: "5",
            name: "Fleetwith Romper",
            category: "Dresses & Skirts",
            image: img5,
            price: 119,
            countInStock: 5,
            brand: "Patagonia",
            rating: "4.5",
            numReviews: 326,
            description: "This multifunctional one-piece romper is made of a 91% recycled polyester/9% spandex blend that’s stretchy, quick-drying and resists wrinkling. Fair Trade Certified sewn."
        },
        {
            _id: "6",
            name: "Fitz Roy Far Out",
            category: "T-Shirts",
            image: img6,
            price: 45,
            countInStock: 12,
            brand:"Patagonia",
            rating: "4.9",
            numReviews: 71,
            description: "Our most versatile technical top is made for use on trails or on the water, with HeiQ Fresh durable odor control and 50+ UPF sun protection. These tops are designed to keep you comfortable when you’re working hard in conditions ranging from cool to hot and are made with 50-100% recycled polyester. Fair Trade Certified d sewn."
        }
    ]
}
export default data;