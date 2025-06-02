"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var client_1 = __importDefault(require("react-dom/client"));
var react_router_1 = require("@tanstack/react-router");
var routes_1 = require("./routes");
client_1.default.createRoot(document.getElementById("root")).render(<react_1.default.StrictMode>
    <react_router_1.RouterProvider router={routes_1.router}/>
  </react_1.default.StrictMode>);
