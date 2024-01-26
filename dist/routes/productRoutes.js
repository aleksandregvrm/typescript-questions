"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
router.route("/").get(productController_1.getAllProducts);
router.route("/:id").get(productController_1.getSingleProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map