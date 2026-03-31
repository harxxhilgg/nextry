# Redux Toolkit Setup Guide for Next.js App Router

This guide covers how to set up Redux Toolkit (with slices) in a modern Next.js App Router project.

## Step 1: Install Dependencies

First, you need to install Redux Toolkit and React-Redux. Run this in your terminal:

```bash
npm install @reduxjs/toolkit react-redux
```

---

## Step 2: Create a Slice

**File Path:** `src/lib/store/features/uiSlice.ts`
**Purpose:** This is where your state logic and actions live (Redux Toolkit Slice).

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isGlobalFilterActive: boolean;
  activeScreenMode: "compact" | "detailed";
}

const initialState: UiState = {
  isGlobalFilterActive: false,
  activeScreenMode: "detailed",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleFilter: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
      // It doesn't actually mutate the state because it uses the Immer library.
      state.isGlobalFilterActive = !state.isGlobalFilterActive;
    },
    setScreenMode: (state, action: PayloadAction<"compact" | "detailed">) => {
      state.activeScreenMode = action.payload;
    },
  },
});

export const { toggleFilter, setScreenMode } = uiSlice.actions;
export default uiSlice.reducer;
```

---

## Step 3: Configure the Store

**File Path:** `src/lib/store/store.ts`
**Purpose:** Configure the central store and combine all your slices.

```typescript
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./features/uiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      // You can add more slices here as your app grows
    },
  });
};

// TypeScript types for the store
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
```

---

## Step 4: Create Typed Hooks

**File Path:** `src/lib/store/hooks.ts`
**Purpose:** Create typed versions of `useDispatch` and `useSelector` so you get TypeScript autocomplete globally in your app.

```typescript
import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./store";

// Use these globally instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
```

---

## Step 5: Create the Provider Component

**File Path:** `src/components/providers/ReduxProvider.tsx`
**Purpose:** Redux requires a React Context Provider. Because of Next.js App Router, this must be a Client Component (`"use client"`). We use a `useRef` to ensure the store is only created once per client session.

```tsx
"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store/store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    // Create the store instance the first time this renders directly
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
```

---

## Step 6: Wrap your App with the Provider

**File Path:** `src/app/layout.tsx` (or `src/app/(protected)/layout.tsx`)
**Purpose:** Wrap the parts of the app that need access to the Redux store. Even though the provider is a Client Component, it is perfectly safe to wrap Server Components inside it.

```tsx
import { ReduxProvider } from "@/components/providers/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
```

---

## Step 7: Use it anywhere in your App!

**File Path:** `src/components/some-shared-component.tsx` (Any file where you need state)
**Purpose:** Read state and dispatch actions safely from any client component.

```tsx
"use client";

import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { toggleFilter } from "@/lib/store/features/uiSlice";

export function SharedControls() {
  // Read state using the typed selector (You will get TS autocomplete here!)
  const isFilterActive = useAppSelector(
    (state) => state.ui.isGlobalFilterActive,
  );

  const dispatch = useAppDispatch();

  return (
    <div className="p-4 border rounded">
      <p>Currently, the filter is: {isFilterActive ? "Active" : "Inactive"}</p>

      <button
        onClick={() => dispatch(toggleFilter())}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Global Filter
      </button>
    </div>
  );
}
```
