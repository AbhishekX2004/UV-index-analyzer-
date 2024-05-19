import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

//api
const geoCodeUrl = "https://api.opencagedata.com/geocode/v1/json?";
const geoCodeKey = process.env.geoCodeKey;

const uviUrl = "https://api.openuv.io/api/v1/uv?";
const uviKey = process.env.uviKey;  

//fun facts
var facts = [
    "Ancient civilizations used various substances for sun protection. For example, ancient Egyptians applied a mixture of rice bran, jasmine, and lupine extracts to shield their skin from the sun.",
    "Astronauts use sunscreen in space to protect their skin from the unfiltered intensity of the sun. The lack of atmosphere means there's no natural protection against harmful UV radiation.",
    "The first commercially available sunscreen was introduced in 1936 by chemist Franz Greiter. He created the product, known as Gletscher Crème (Glacier Cream), after experiencing sunburn during a mountain-climbing expedition.",
    "There are sunscreens specifically formulated for pets, especially dogs with thin fur or exposed skin areas. Just like humans, pets can suffer from sunburn, and sunscreen can help protect them.",
    "Some clothing items are designed with built-in UV protection. These fabrics are treated or constructed in a way that blocks a significant amount of UV rays, providing an additional layer of sun defense.",
    "Researchers are exploring the development of sunscreen pills. These would contain compounds that, when ingested, provide protection from UV radiation. However, this technology is still in the early stages of development.",
    "Certain sunscreens are labeled as \"coral-safe\" or \"reef-friendly.\" These formulations aim to minimize the environmental impact of sunscreen chemicals on coral reefs, which can be harmed by certain ingredients commonly found in sunscreens.",
    "Some everyday products, like makeup and moisturizers, include SPF. While they can provide some level of sun protection, they may not be sufficient on their own for prolonged sun exposure, and it's often recommended to use dedicated sunscreen."
]

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", {
        fact: facts[Math.floor(Math.random() * facts.length)]
    });
});

app.post("/address", async (req, res) => {
    const address = req.body.address.replace(/ /g, "+");

    try {
        const geoResponse = await axios.get(geoCodeUrl, {
            params: {
                key: geoCodeKey,
                q: address
            }
        });
        const { lat, lng } = geoResponse.data.results[0].geometry;

        const uviResponse = await axios.get(uviUrl, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': uviKey
            },
            params: { lat, lng }
        });

        res.render("index", {
            fact: facts[Math.floor(Math.random() * facts.length)],
            uvi: uviResponse.data.result
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.render("index", {
            fact: facts[Math.floor(Math.random() * facts.length)],
            uvi: null,
            error: "Unable to retrieve data. Please try again later."
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});