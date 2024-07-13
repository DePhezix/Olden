import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import {BrowserRouter} from "react-router-dom";

import {UserProvider} from "./contexts/user.context";
import {CategoriesProvider} from "./contexts/categories.contexts";
import {CartProvider} from "./contexts/cart.context";
import {UrlHistoryProvider} from "./contexts/urlHistory.context";
import {LoadingFeedbackProvider} from "./contexts/loadingFeedback.context";
import {DataUpdatedProvider} from "./contexts/dataUpdated.context";
import {AdminProvider} from "./contexts/admin.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <LoadingFeedbackProvider>
                <DataUpdatedProvider>
                    <UserProvider>
                        <UrlHistoryProvider>
                            <CategoriesProvider>
                                <CartProvider>
                                    <AdminProvider>
                                            <App/>
                                    </AdminProvider>
                                </CartProvider>
                            </CategoriesProvider>
                        </UrlHistoryProvider>
                    </UserProvider>
                </DataUpdatedProvider>
            </LoadingFeedbackProvider>
        </BrowserRouter>
    </React.StrictMode>
);
