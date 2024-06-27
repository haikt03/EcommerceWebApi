import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";
import { setBasket } from "../basket/basketSlice";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null,
};

export const signInAsync = createAsyncThunk<User, FieldValues>(
    "account/signInAsync",
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.Account.login(data);
            const { basket, ...user } = userDto;
            if (basket) {
                thunkAPI.dispatch(setBasket(basket));
            }
            localStorage.setItem("user", JSON.stringify(user));

            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchCurrentUserAsync = createAsyncThunk<User>(
    "account/fetchCurrentUserAsync",
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
        try {
            const userDto = await agent.Account.currentUser();
            const { basket, ...user } = userDto;
            if (basket) {
                thunkAPI.dispatch(setBasket(basket));
            }
            localStorage.setItem("user", JSON.stringify(user));

            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem("user")) {
                return false;
            }
        },
    }
);

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            router.navigate("/");
        },
        setUser: (state, action) => {
            const claims = JSON.parse(atob(action.payload.token.split(".")[1]));
            const roles =
                claims[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ];
            state.user = {
                ...action.payload,
                roles: typeof roles === "string" ? [roles] : roles,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUserAsync.rejected, (state) => {
            state.user = null;
            localStorage.removeItem("user");
            toast.error("Session expired. Please login again.");
            router.navigate("/");
        });
        builder.addMatcher(
            isAnyOf(signInAsync.fulfilled, fetchCurrentUserAsync.fulfilled),
            (state, action) => {
                const claims = JSON.parse(
                    atob(action.payload.token.split(".")[1])
                );
                const roles =
                    claims[
                        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                    ];
                state.user = {
                    ...action.payload,
                    roles: typeof roles === "string" ? [roles] : roles,
                };
            }
        );
        builder.addMatcher(isAnyOf(signInAsync.rejected), (_state, action) => {
            throw action.payload;
        });
    },
});

export const { signOut, setUser } = accountSlice.actions;
