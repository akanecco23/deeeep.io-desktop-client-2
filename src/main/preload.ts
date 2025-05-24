import { inject } from "./preload/injector";

if (!window.execPreload) {
    window.execPreload = true;
    inject();
}