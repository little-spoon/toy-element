import type { Component } from "vue";

export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export type NativeType = "button" | "reset" | "submit";
export type ButtonSize = "large" | "small" | "mini";

export interface ButtonProps {
    tag?: string | Component;
    type?: ButtonType;
    size?: ButtonSize;
    nativeType?: NativeType;
    loading?: boolean;
    disabled?: boolean;
    icon?: string;
    circle?: boolean;
    round?: boolean;
    plain?: boolean;
    // autofocus?: boolean;
    // href?: string;
    // target?: string;
    // onClick?: (event: MouseEvent) => void;

}