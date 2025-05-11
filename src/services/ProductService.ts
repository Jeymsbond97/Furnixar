import axios from "axios";
import { serverApi } from "../libs/config";
import { Product, ProductInquiry } from "../libs/types/product";

class ProductService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async getProducts(input: ProductInquiry): Promise<Product[]> {
        try {
            let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
            if (input.productCollection) url += `&productCollection=${input.productCollection}`;
            if (input.search) url += `&search=${input.search}`;

            const result = await axios.get(url);
            console.log('getProducts:', result.data);

            return result.data;
        }
        catch (err) {
            console.log("Error, getProducts:", err)
            throw err;
        }
    }

    public async getProduct(id: string): Promise<Product> {
        try{
            const url = `${this.path}/product/${id}`;
            const result = await axios.get(url, {withCredentials: true});
            console.log("getProduct:", result);

            return result.data;
        }
        catch(err){
            console.log("Error, getProduct:", err)
            throw err;
        }
    }

}

export default ProductService;