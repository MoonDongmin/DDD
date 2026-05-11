import {KilogramQuantity, type WidgetCode} from "./widget.ts";

type ProductCode = WidgetCode | GizmoCode;
type OrderQuantity = UnitQuantity | KilogramQuantity;